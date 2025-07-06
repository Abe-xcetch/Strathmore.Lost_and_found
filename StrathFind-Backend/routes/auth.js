
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    const { studentID, password } = req.body;

    // Validate input
    if (!studentID || !password) {
        return res.status(400).json({ error: "Student ID and password required" });
    }
    if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters" });
    }

    try {
        // Check if user exists
        const existingUser = await User.findOne({ studentID });
        if (existingUser) {
            return res.status(400).json({ error: "Student ID already registered" });
        }

        // Save new user
        const user = new User({ studentID, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: "Server error" });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { studentID, password } = req.body;
        const user = await User.findOne({ studentID });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                studentID: user.studentID
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;