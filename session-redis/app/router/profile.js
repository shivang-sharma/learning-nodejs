const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authentication');
const profileController = require('../controller/profile');

router.use(authMiddleware);

router.get('/', profileController);

module.exports = router;