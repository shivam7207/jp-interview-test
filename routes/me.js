const express = require('express')
const router = express()

router.get('/', (req, res) => {
    if (req.session.user) {
      res.status(200).json(req.session.user);
    } else {
      res.status(404).json({ message: 'Not authenticated' });
    }
  });

module.exports = router
  