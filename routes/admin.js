const express = require('express')
const router = express.Router()
const Candidate = require('../models/candidate')
const User = require('../models/user')

router.get('/candidates', async (req, res) => {
    try {
        const candidates = await Candidate.find()
        res.status(200).json(candidates)
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
        console.error(err)
    }
})

router.get('/users', async (req, res) => {
    try {
        const candidates = await User.find()
        res.status(200).json(candidates)
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
        console.error(err)
    }
})

module.exports = router