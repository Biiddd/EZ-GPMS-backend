const express = require('express');
const router = express.Router();
const getGroupHandler = require('../../router_handler/getGroup_handler');

router.get('/api/admin/getGroup', getGroupHandler.get);

module.exports = router;
