// adminRoutes.js
const express = require('express');
const Admin = require('../model/adminModel');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });

    if (admin) {
      // Valid credentials
      return res.status(200).json({ message: 'Admin login successful' });
    }

    // Invalid credentials
    return res.status(401).json({ error: 'Invalid Admin username or password' });
  } catch (error) {
    console.error('Error during admin login:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;