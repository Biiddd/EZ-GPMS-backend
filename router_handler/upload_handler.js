const multer = require('multer');
const path = require('path');
const fs = require('fs');
const logger = require('../modules/logger');
const db = require('../db/index'); // 引入数据库连接

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const {stu_id} = req.body;

        // 设置文件路径 uploads/file_id
        const uploadDir = path.resolve(__dirname, `../uploads/${stu_id}`);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, {recursive: true});
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const {filename} = req.body;
        // 用 file_id filename 重命名文件
        const uniqueFilename = `${filename}${path.extname(file.originalname)}`;
        cb(null, uniqueFilename);
    }
});

const upload = multer({storage});

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
        console.log(req.body)
        const {stu_id, filename} = req.body;
        const filePath = path.join(`uploads/${stu_id}`, file.filename);


        // 构建 SQL 更新语句
        let query;

        switch (filename) {
            case '开题报告':
                query = `UPDATE file
                         SET file_start = ?
                         WHERE file_id = ${stu_id}`;
                break;
            case '外文翻译':
                query = `UPDATE file
                         SET file_translation = ?
                         WHERE file_id = ${stu_id}`;
                break;
            case '校外毕设申请':
                query = `UPDATE file
                         SET file_outschool = ?
                         WHERE file_id = ${stu_id}`;
                break;
            case '中期成果':
                query = `UPDATE file
                         SET file_mid = ?
                         WHERE file_id = ${stu_id}`;
                break;
            case '终稿':
                query = `UPDATE file
                         SET result_mid = ?
                         WHERE file_id = ${stu_id}`;
                break;
            case '答辩申请表':
                query = `UPDATE file
                         SET file_defense = ?
                         WHERE file_id = ${stu_id}`;
                break;
            default:
                return res.status(400).send('未知的文件类型');
        }

        // 执行数据库更新操作
        db.query(query, [filePath, stu_id], (err) => {
            if (err) {
                logger.error('存储文件路径到数据库时出错:', err);
                return res.status(500).send('存储文件路径到数据库时出错');
            }

            logger.info('文件上传成功:', file.filename);
            res.status(200).send('文件上传成功');
        });
    });
};
