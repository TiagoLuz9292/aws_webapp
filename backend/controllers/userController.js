const User = require('../models/userModel');
const Product = require('../models/productModel'); // Ensure this is imported

const getProfile = async (req, res) => {
    try {
        console.log('Fetching user profile for user:', req.user.userId); // Debugging statement
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('User profile found:', user); // Debugging statement
        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(400).json({ error: err.message });
    }
};

const deleteAccount = async (req, res) => {
    try {
        console.log('Deleting account for user:', req.user.userId); // Debugging statement
        const user = await User.findById(req.user.userId);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user's products
        await Product.deleteMany({ user: req.user.userId });
        console.log('Deleted products for user:', req.user.userId); // Debugging statement

        // Delete the user
        await User.deleteOne({ _id: req.user.userId });
        console.log('Deleted user:', req.user.userId); // Debugging statement

        res.json({ message: 'User and associated products deleted' });
    } catch (err) {
        console.error('Error deleting user account:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getProfile, deleteAccount };
