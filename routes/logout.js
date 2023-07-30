const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json({ message: 'Logout successful' });
      }
    });
  });

module.exports = router
  