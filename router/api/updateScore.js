const express = require('express');
const router = express.Router();
const updateScore_handler = require('../../router_handler/updateScore_handler');

router.put('/api/teacher/updateScore', updateScore_handler.updateScore);

module.exports = router;
