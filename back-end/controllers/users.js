const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const usersRouter = express.Router();

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            name,
            passwordHash,
        });

        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error saving the user' });
    }
});

module.exports = usersRouter;

