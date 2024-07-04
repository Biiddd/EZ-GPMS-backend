const express = require('express');
const router = express.Router();
const getGroupHandler = require('../../router_handler/getGroup_handler');

router.post('/api/stu/getGroup', getGroupHandler.getScore);

module.exports = router;