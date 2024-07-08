const express = require('express');
const router = express.Router();
const getInfo_handler = require('../../router_handler/Info_handler');

router.post('/api/getFullInfo', getInfo_handler.getFullInfo);
router.post('/api/getEditInfo', getInfo_handler.getEditInfo);
router.put('/api/updateInfo', getInfo_handler.updateInfo);
router.put('/api/admin/addUser', getInfo_handler.addUser);

module.exports = router;
