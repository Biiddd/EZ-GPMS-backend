const db = require('../db/index');
const logger = require('../modules/logger');

exports.teacherDownload = (req, res) => {
  let { user_id, file } = req.query;
  switch (file) {
    case '开题报告':
      const start_file = `SELECT start_file
                          FROM file
                          WHERE stu_id = ?`;
      db.query(start_file, [user_id], (err, result) => {
        if (err) {
          logger.error('查询数据库时出错:', err);
          return res.status(200).json({ code: 50001, msg: '查询数据库时出错' });
        }
        if (result.length === 0) {
          logger.error('未找到文件')
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].start_file;
        logger.info('获取文件路径成功:', path)
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    case '外文翻译':
      const translation_file = `SELECT translation_file
                                FROM file
                                WHERE stu_id = ?`;
      db.query(translation_file, [user_id], (err, result) => {

        if (result.length === 0) {
          logger.error('未找到文件')
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].translation_file;
        logger.info('获取文件路径成功:', path)
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    case '中期成果':
      const midWork_file = `SELECT midWork_file
                            FROM file
                            WHERE stu_id = ?`;
      db.query(midWork_file, [user_id], (err, result) => {

        if (result.length === 0) {
          logger.error('未找到文件')
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].midWork_file;
        logger.info('获取文件路径成功:', path)
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    case '中期报告':
      const midReport_file = `SELECT midReport_file
                              FROM file
                              WHERE stu_id = ?`;
      db.query(midReport_file, [user_id], (err, result) => {

        if (result.length === 0) {
          logger.error('未找到文件')
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].midReport_file;
        logger.info('获取文件路径成功:', path)
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    case '毕业论文终稿':
      const final_file = `SELECT final_file
                          FROM file
                          WHERE stu_id = ?`;
      db.query(final_file, [user_id], (err, result) => {
        if (err) {
          logger.error('查询数据库时出错:', err);
          return res.status(200).json({ code: 50001, msg: '查询数据库时出错' });
        }
        if (result.length === 0) {
          logger.error('未找到文件')
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].final_file;
        logger.info('获取文件路径成功:', path)
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    case '答辩申请表':
      const defenseApply_file = `SELECT defenseApply_file
                                 FROM file
                                 WHERE stu_id = ?`;
      db.query(defenseApply_file, [user_id], (err, result) => {

        if (result.length === 0) {
          logger.error('未找到文件')
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].defenseApply_file;
        logger.info('获取文件路径成功:', path)
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    default:
      return res.status(200).json({ code: 40001, msg: '不正确的文件名' });
  }
};

// 公共文件下载逻辑
exports.stuDownload = (req, res) => {
  let { file } = req.query;
  switch (file) {
    case '校外毕设申请表':
      const outSchool_file_template = `SELECT common_file_path
                                       FROM common_file
                                       WHERE common_file_name = ?`;
      db.query(outSchool_file_template, [file], (err, result) => {
        if (result.length === 0) {
          logger.error('未找到文件')
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].common_file_path;
        logger.info('获取文件路径成功:', path)
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    case '开题报告模板':
      const start_file_template = `SELECT common_file_path
                                   FROM common_file
                                   WHERE common_file_name = ?`;
      db.query(start_file_template, [file], (err, result) => {
        if (result.length === 0) {
          logger.error('未找到文件')
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].common_file_path;
        logger.info('获取文件路径成功:', path)
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    case '毕业论文模板':
      const final_file_template = `SELECT common_file_path
                                   FROM common_file
                                   WHERE common_file_name = ?`;
      db.query(final_file_template, [file], (err, result) => {
        if (result.length === 0) {
          logger.error('未找到文件')
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].common_file_path;
        logger.info('获取文件路径成功:', path)
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    case '答辩申请模板':
      const defenseApply_file_template = `SELECT common_file_path
                                          FROM common_file
                                          WHERE common_file_name = ?`;
      db.query(defenseApply_file_template, [file], (err, result) => {
        if (result.length === 0) {
          logger.error('未找到文件')
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].common_file_path;
        logger.info('获取文件路径成功:', path)
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    default:
      logger.error('不正确的文件名');
      return res.status(200).json({ code: 40001, msg: '不正确的文件名' });
  }
};
