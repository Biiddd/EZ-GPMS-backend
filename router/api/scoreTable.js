const express = require('express');
const router = express.Router();
const scoreTableHandler = require("../../router_handler/scoreTable_handler");

router.get("/api/scoreTable", scoreTableHandler.scoreTable);

module.exports = router;
