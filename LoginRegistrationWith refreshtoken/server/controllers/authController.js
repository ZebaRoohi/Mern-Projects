const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        res.status(201).json("Account created successfully");
    } catch (err) {
        res.status(500).json('Internal server error');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json("User not found");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json('Invalid credentials');
        }
        const accessToken = jwt.sign({ userId: user._id }, 'access_secret', { expiresIn: '1h' });
        const refreshToken = jwt.sign({ userId: user._id }, 'refresh_secret', { expiresIn: '7d' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days
        res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
        res.status(500).json("Internal server error");
    }
};

exports.dashboard = (req, res) => {
    res.status(200).json('Welcome to dashboard');
};

exports.logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.status(200).json('Logout successfully');
};
