const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ 
                msg: 'User already exists' 
            });
        }
        user = new User({ username, email, password });
        await user.save();
        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
        res.status(201).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, username, password } = req.body;
    let user;
    try {
        if (email) {
            user = await User.findOne({ email });
        } else if (username) {
            user = await User.findOne({ username });
        }
        if (!user) {
            return res.status(400).json({ 
                msg: 'Invalid credentials' 
            });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ 
                msg: 'Invalid credentials' 
            });
        }
        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
