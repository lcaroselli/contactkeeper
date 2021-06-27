const express = require('express');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();
const User = require('../models/Users');

// instead of app.get, etc, can now just use router

// Registering a user
// '/' here is equivalent to api/users
// POST api/users
// @access public
router.post(
  '/',
  [
    check('name', 'Please add a Name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send('passed');

    // this is going to give me the data that is sent to the route
    // res.send(req.body);
  }
);

module.exports = router;
