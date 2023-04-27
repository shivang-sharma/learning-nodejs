const express = require('express');
const router = express.Router();
const authController = require('../controller/authentication');


router.post('/login', authController.loginController);
router.post('/logout', authController.logoutController)

module.exports = router;