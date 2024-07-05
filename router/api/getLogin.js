const express = require("express");
const router = express.Router();
const loginHandle = require("../../router_handler/getLogin_handler");

router.post("/api/login", loginHandle.isCorrect);

module.exports = router;