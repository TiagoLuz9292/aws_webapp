const express = require('express');
const { getProfile, deleteAccount } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware'); // Ensure this is imported correctly
const router = express.Router();

router.get('/profile', auth, getProfile);
router.delete('/profile', auth, deleteAccount);

module.exports = router;
