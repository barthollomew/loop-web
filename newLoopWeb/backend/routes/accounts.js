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

// Create a new account
router.post('/signup', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newAccount = await Account.create({ username, password, email });
    res.status(201).json({ message: 'Account created!', user: newAccount });
  } catch (err) {
    res.status(500).json({ message: 'Error creating account', error: err.message });
  }
});

// Sign in to an account
router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const account = await Account.findOne({ where: { username } });
    if (!account || account.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Sign in successful', user: account });
  } catch (err) {
    res.status(500).json({ message: 'Error signing in', error: err.message });
  }
});

// Update an account
router.put('/update/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, password, email } = req.body;

    const account = await Account.findOne({ where: { id: userId } });
    if (!account) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update and save the account details
    await account.update({
      username: username || account.username,
      password: password || account.password,
      email: email || account.email,
    });

    res.status(200).json({ message: 'Account updated!', user: account });
  } catch (err) {
    res.status(500).json({ message: 'Error updating account', error: err.message });
  }
});

// Delete an account
router.delete('/delete/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const account = await Account.findOne({ where: { username } });
    if (!account) {
      return res.status(404).json({ message: 'User not found' });
    }

    await account.destroy();

    res.status(200).json({ message: 'Account deleted!' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting account', error: err.message });
  }
});

module.exports = router;
