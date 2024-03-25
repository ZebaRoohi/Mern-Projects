// userController.js

const User = require('../models/User');

// Controller function to fetch user information
const getUserInfo = async (req, res) => {
    try {
        const userId = req.userId; // Extract userId from the request
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user information
        res.status(200).json({
            username: user.username,
            email: user.email,
            // Add other user data as needed
        });
    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getUserInfo
};
