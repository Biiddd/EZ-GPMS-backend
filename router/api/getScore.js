const express = require('express');
const router = express.Router();
const getScoreHandler = require('../../router_handler/getScore_handler');

router.post('/api/stu/getScore', getScoreHandler.getScore);

module.exports = router;
