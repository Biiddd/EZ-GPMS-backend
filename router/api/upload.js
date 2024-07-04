const express = require('express');
const router = express.Router();
const uploadFinal_handler = require('../../router_handler/upload_handler');

// 处理文件上传请求
router.post('/api/upload/final', uploadFinal_handler.uploadSingle);

module.exports = router;