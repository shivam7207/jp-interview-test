const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const router = express.Router()

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await user.comparePassword(password))) {
        req.session.user = user;
        console.log(req.session)
        return res.status(200).json(user)
    } else {
        return res.status(404).json({ message: "User not found with this creds. try with different creds" })
    }
});


module.exports = router