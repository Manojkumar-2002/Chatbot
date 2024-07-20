const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust path if needed
const config = require('../utils/config');
const { v4: uuidv4 } = require('uuid');

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                message: 'User does not exist'
            });
        }

        const isAuthenticated = await bcrypt.compare(password, user.passwordHash);
        if (!isAuthenticated) {
            return res.status(401).json({
                message: 'Password is incorrect'
            });
        }

        const payload = {
            username: user.username,
            id: user._id,
        };

        const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '7d' });

        // If you still need session IDs:
        const sessionId = uuidv4(); // Generate session ID
        // Save sessionId and user._id to database or in-memory store here

        res.status(200).json({
            token,
            username: user.username,
            name: user.name,
            userId:user._id,
            sessionId 
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

module.exports = loginRouter;
