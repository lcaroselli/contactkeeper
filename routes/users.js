const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/Users');
const config = require('config');

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        email,
        name,
        password,
      });

      // encrypt password we just created for the new user
      const salt = await bcrypt.genSalt(10);

      // take salt and hash password
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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

    // this is going to give me the data that is sent to the route
    // res.send(req.body);
  }
);

module.exports = router;
