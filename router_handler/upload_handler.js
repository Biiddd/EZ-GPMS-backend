const multer = require('multer');
const path = require('path');
const logger = require('../modules/logger');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 使用 path.resolve 将相对路径解析为绝对路径
        const uploadDir = path.resolve(__dirname, '../uploads/');
        cb(null, uploadDir); // 存储路径，确保目录存在
    },
    filename: (req, file, cb) => {
        // 生成文件名，使用当前时间戳和原始文件扩展名
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// 创建 Multer 实例
const upload = multer({ storage });

// 处理单文件上传的处理函数
exports.uploadSingle = (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            logger.error('上传文件时出错:', err);
            return res.status(500).send('上传文件时出错');
        } else if (err) {
            // An unknown error occurred when uploading
            logger.error('上传文件时出现未知错误:', err);
            return res.status(500).send('上传文件时出现未知错误');
        }

        // 文件上传成功
        const file = req.file;
        if (!file) {
            return res.status(400).send('未上传文件');
        }
        // 可以在这里处理上传成功的逻辑，如保存文件信息到数据库等
        logger.info('文件上传成功:', file.filename);
        res.status(200).send('文件上传成功');
    });
};
