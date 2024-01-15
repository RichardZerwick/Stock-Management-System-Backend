const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Define endpoints
router.put('/update/:userId', userController.updateUserInfo);
router.get('/info/:userId', userController.getUserInfo);

module.exports = router;
