const express = require('express');
const router = express.Router();
const changePasswdHandler = require('../../router_handler/changePasswd_handler');

router.post('/api/changePasswd', changePasswdHandler.changePasswd);

module.exports = router;
