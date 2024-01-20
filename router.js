const express = require('express');

const user = require('./user');

const router = express.Router();

router.get('/search/:userId/:query', user.search);

// Task Routes
router.get('/friend/:userId/:friendId', user.addFriend);
router.get('/unfriend/:userId/:friendId', user.unFriend);

module.exports = router;