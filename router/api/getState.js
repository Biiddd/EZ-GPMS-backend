const express = require('express');
const router = express.Router();
const getStateHandler = require('../../router_handler/getState_handler');

router.post('/api/stu/getState', getStateHandler.getInfo);
router.post('/api/teacher/getState', getStateHandler.getTeacherState);

module.exports = router;
