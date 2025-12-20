const Attendance = require('../models/model');
const mongoose = require('mongoose');

async function getAttendance(req, res) {
    try {
        const attendanceData = await Attendance.find({}).sort({ Entry: -1 });
        res.json(attendanceData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createpage(req, res) {
    const body = req.body;

    // Validation
    if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
        return res.status(400).json({ message: 'Name is required and must be a non-empty string.' });
    }

    // Start a session for transaction to prevent race conditions
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find the last token within the transaction
        const lastUser = await Attendance.findOne()
            .sort({ token: -1 })
            .session(session)
            .exec();

        const tokenCount = lastUser ? lastUser.token + 1 : 1;

        // Create new attendance record
        const newAttendance = await Attendance.create([{
            name: body.name.trim(),
            token: tokenCount,
            Entry: new Date(),
            Exit: null,
            notes: body.notes ? body.notes.trim() : ''
        }], { session });

        // Commit the transaction
        await session.commitTransaction();

        res.status(201).json({ token: newAttendance[0].token });
    } catch (err) {
        // Rollback on error
        await session.abortTransaction();
        console.error("Error in createpage:", err);
        res.status(500).json({ message: 'Server error while creating entry.', error: err.message });
    } finally {
        session.endSession();
    }
}

const Exitpage = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ success: false, message: "Token number is required" });
        }

        const numericToken = parseInt(token, 10);
        if (isNaN(numericToken)) {
            return res.status(400).json({ success: false, message: "Token must be a valid number." });
        }

        const exitTime = new Date();

        const result = await Attendance.findOneAndUpdate(
            { token: numericToken },
            { $set: { Exit: exitTime } },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ success: false, message: "Token not found" });
        }

        res.json({ success: true, message: "Exit time recorded successfully", exit_time: exitTime });

    } catch (error) {
        console.error("Error in Exitpage function:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { getAttendance, createpage, Exitpage };