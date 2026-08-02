const express = require('express');
const router = express.Router();
const cakesData = require('../data/cakesData');

// GET /api/cakes
router.get('/', (req, res) => {
  try {
    res.json({ success: true, data: cakesData });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error fetching cakes' });
  }
});

module.exports = router;