const express = require('express');
const router = express.Router();
const getStuList_handler = require('../../router_handler/getStuList_handler');

router.post('/api/teacher/getStuList', getStuList_handler.getStuList);

module.exports = router;
