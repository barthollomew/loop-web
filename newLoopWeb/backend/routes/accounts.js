const express = require('express');
const router = express.Router();
const { Account } = require('../models');

// Get all accounts
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving accounts', error: err });
  }
});

// Additional routes for creating, updating, and deleting accounts can be added here

module.exports = router;
