const user = require('../models/model');
const { route } = require('../routers/route');



let tokenCount = 0;




function gethomepage(req, res) {
    res.render('main')
}

function getstartpage(req, res) {
    res.render('start')
}

function getexitpage(req, res) {
    res.render('exit')
}

function gettokenpage(req, res) {
    res.render('token', { token: tokenCount })
}

function getadminpage(req, res) {
    res.render('admin')
}

async function createIncrement(req, res) {
    try {
        tokenCount++;
        await Counter.updateOne({}, { value: tokenCount }, { upsert: true });
        res.redirect("/");
    } catch (error) {
        console.error("Error updating counter:", error);
        res.status(500).send("Internal Server Error");
    }
}

function Entrypage(req, res) {
    const { name } = req.body;
    const timestamp = new Date().toLocaleTimeString();

    entries.push({ name, entryTime: timestamp });

    console.log('Updated Admin View:', entries); 
    res.status(200).json({ message: 'Entry recorded', data: entries });

}








function createpage(req, res) {
    const body = req.body;
    tokenCount++;
    user.create(
        {
            name: body.name,
            token: tokenCount
        }
    )

        .then((user) => {
            res.render('token', { token: tokenCount })

        })

        .catch((err) => {
            res.json(err)
        })
}


const Exitpage = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ success: false, message: "Token number is required" });
        }

        const exitTime = new Date().toISOString();


        const result = await Attandence.findOneAndUpdate(
            { token: token },
            { $set: { exit_time: exitTime } },
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







module.exports = { gethomepage, getstartpage, getexitpage, gettokenpage, getadminpage, createpage, createIncrement, Exitpage, Entrypage }