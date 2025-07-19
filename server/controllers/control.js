const user = require('../models/model');







function gethomepage(req, res) {
    // This will be handled by the React app now
    // res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
}

function getstartpage(req, res) {
    // This will be handled by the React app now
}

function getexitpage(req, res) {
    // This will be handled by the React app now
}

function gettokenpage(req, res) {
    // This will be handled by the React app now
}

async function getAttendance(req, res) {
    try {
        const attendanceData = await user.find({});
        res.json(attendanceData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}









async function createpage(req, res) {
    const body = req.body;
    if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
        return res.status(400).json({ message: 'Name is required and must be a non-empty string.' });
    }

    try {
        const lastUser = await user.findOne().sort({ token: -1 }).exec();
        const tokenCount = lastUser ? lastUser.token + 1 : 1;

        const newUser = await user.create({
            name: body.name.trim(),
            token: tokenCount,
            Entry: new Date(),
            Exit: null,
            notes: body.notes
        });
        res.status(201).json({ token: newUser.token });
    } catch (err) {
        console.error("Error in createpage:", err);
        res.status(500).json({ message: 'Server error while creating entry.', error: err.message });
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

        const result = await user.findOneAndUpdate(
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
        res.status(500).json({ success: false, message: "Server error"});
    }
};







module.exports = { gethomepage, getstartpage, getexitpage, gettokenpage, getAttendance, createpage, Exitpage }