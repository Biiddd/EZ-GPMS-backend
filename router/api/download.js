const express = require('express');
const router = express.Router();
const getDownloadPathHandler = require('../../router_handler/download_handler');

router.get('/api/teacher/getFilePath', getDownloadPathHandler.teacherDownload);
router.get('/api/stu/getFilePath', getDownloadPathHandler.stuDownload);

module.exports = router;
