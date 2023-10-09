// userController.js

import User from '../models/user.js';

export const signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Add session management, token generation, etc. here
    res.status(200).json({ message: 'Successfully signed in', user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const signUp = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    
    const newUser = await User.create({ username, password, email });
    res.status(201).json({ message: 'Successfully signed up', user: newUser });
  } catch (err) {
    console.error("Error during sign-up:", err); // Log the error for debugging
    res.status(500).json({ error: 'Server error' });
  }
};
