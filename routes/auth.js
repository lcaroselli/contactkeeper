const express = require('express');
const router = express.Router();

// instead of app.get, etc, can now just use router

// GET api/auth
// @access private
// Get logged-in user
router.get('/', (req, res) => {
  res.send('Get logged-in user');
});

// POST api/auth
// @access public
// Auth user and get token
router.post('/', (req, res) => {
  res.send('Log-in user');
});

module.exports = router;
