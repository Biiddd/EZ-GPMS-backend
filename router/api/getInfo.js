const express = require("express");
const router = express.Router();
const getInfoHandler = require("../../router_handler/getInfo_handler");

router.post("/api/getInfo", getInfoHandler.getInfo);

module.exports = router;