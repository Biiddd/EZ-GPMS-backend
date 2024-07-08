const express = require('express');
const router = express.Router();
const getUserBasicInfo_handler = require('../../router_handler/getUser_handler');

router.get('/api/admin/getStu', getUserBasicInfo_handler.getStu);
router.get('/api/admin/getTeacher', getUserBasicInfo_handler.getTeacher);

module.exports = router;
