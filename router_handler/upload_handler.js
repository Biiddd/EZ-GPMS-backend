const multer = require('multer');
const path = require('path');
const fs = require('fs');
const logger = require('../modules/logger');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { stu_id } = req.body;

    // 设置文路径 uploads/stu_id
    const uploadDir = path.resolve(__dirname, `../uploads/${stu_id}`);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const { filename } = req.body;
    // 用 stu_id filename 重命名文件
    const uniqueFilename = `${filename}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});

const upload = multer({ storage });

exports.uploadSingle = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      logger.error('上传文件时出错:', err);
      return res.status(500).send('上传文件时出错');
    } else if (err) {
      logger.error('上传文件时出现未知错误:', err);
      return res.status(500).send('上传文件时出现未知错误');
    }

    const file = req.file;
    if (!file) {
      return res.status(400).send('未上传文件');
    }
    logger.info('文件上传成功:', file.filename);
    res.status(200).send('文件上传成功');
  });
};
