const express = require("express");
const router = express.Router();
const getStateHandler = require("../../router_handler/getState_handler");

router.post("/api/stu/getState", getStateHandler.getInfo);

module.exports = router;