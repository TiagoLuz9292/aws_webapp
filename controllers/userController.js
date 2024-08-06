const User = require('../models/userModel');

// Example function for getting user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).send('User not found');
        res.status(200).json(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

module.exports = { getUserProfile };
