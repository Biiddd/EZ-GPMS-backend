const db = require('../db/index');
const logger = require('../modules/logger');

exports.changePasswd = (req, res) => {
  let { user_id, newPasswd } = req.body;

  logger.info('user_id: ', user_id);
  logger.info('newPasswd: ', newPasswd);

  const query = `UPDATE user
                 SET password = ?
                 WHERE user_id = ?`;

  db.query(query, [newPasswd, user_id], (err) => {
    if (err) {
      logger.error('写入数据库时出错:', err);
      return res.status(500).send('写入数据库时出错');
    }
    logger.info('用户' + user_id + '密码修改为' + newPasswd);
    return res.status(200).send('密码修改成功');
  });
};
