const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/Users');
const config = require('config');

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
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // res.send('Log-in user');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // if no user with that email, then...
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // if there is a user, continue to check the password
      const isMatch = await bcrypt.compare(password, user.password);
      // password here is plain text variable in the body, and the other arg is the hashed password

      // if the passwords don't match, then...
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // send back json web token to user
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) {
            res.json({ token });
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
