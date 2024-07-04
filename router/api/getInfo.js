const express = require('express');
const router = express.Router();
const getInfo_handler = require('../../router_handler/getInfo_handler');

router.post('/api/getInfo', getInfo_handler.getInfo);

module.exports = router;
