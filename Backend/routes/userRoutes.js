const express = require('express');
const User = require('../model/userModel'); // Assuming you have a UserModel defined

const router = express.Router();

// /useroutes.js

router.post('/login', async (req, res) => {
  const { email, cpass } = req.body;

  try {
    // Check if the user with the provided email and password exists in the database
    const user = await User.findOne({ email, cpass });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If the user exists, consider it as a successful login
    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

