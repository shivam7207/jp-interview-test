const express = require('express');
const Candidate = require('../models/candidate');
const User = require('../models/user');
const router = express.Router();

router.post('/', async (req, res) => {
    console.log('step 1')
    const { candidateID } = req.body;
    try {
        if (!candidateID) {
            console.log(candidateID)
            res.status(401).json({ message: 'candidateID is missing' });
        }

        if (req.session.user.vote) {
            console.log('logged in')
            return res.json({ message: 'more than one vote not allowed' });
        }

        // else
        const candidate = await Candidate.findByIdAndUpdate(
            candidateID,
            { $push: { users: req.session?.user?._id } },
            { new: true }
        );
        console.log(candidate)

        const user = await User.findByIdAndUpdate(
            req.session.user._id,
            { vote: candidateID },
            { new: true }
        );
        req.session.user = user;
        if (user && candidate) {
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(err);
    }
});

module.exports = router;
