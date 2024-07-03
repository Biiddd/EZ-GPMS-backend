const express = require("express");
const router = express.Router();
const uploadAskHandler = require("../../router_handler/uploadAsk_handler");

router.post('/api/uploadAsk', uploadAskHandler.uploadAsk);

module.exports = router;
