const express = require('express');
const router = express.Router();

// instead of app.get, etc, can now just use router

// GET api/contacts
// @access private
// Get all of a user's contacts
router.get('/', (req, res) => {
  res.send('Get all contacts');
});

// POST api/contacts
// @access private
// Add new contact for a user
router.post('/', (req, res) => {
  res.send('Add contact');
});

// PUT api/contacts/:id
// @access private
// Update contact
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// DELETE api/contacts/:id
// @access private
// Delete contact
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
