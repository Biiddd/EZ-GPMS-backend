const express = require('express');
const router = express.Router();
const uploadFinal_handler = require('../../router_handler/upload_handler');

router.post('/api/upload', uploadFinal_handler.uploadSingle);

module.exports = router;
