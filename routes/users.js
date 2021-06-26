const express = require('express');
const router = express.Router();

// instead of app.get, etc, can now just use router

// Registering a user
// '/' here is equivalent to api/users
// POST api/users
// @access public
router.post('/', (req, res) => {
  res.send('Register a user');
});

module.exports = router;
