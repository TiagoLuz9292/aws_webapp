const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile);
router.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
    res.status(200).send('Admin access granted');
});

module.exports = router;
