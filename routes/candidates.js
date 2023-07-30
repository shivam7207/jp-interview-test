const express = require('express');
const Candidate = require('../models/candidate');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find({}, '-users');
    res.status(200).json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
