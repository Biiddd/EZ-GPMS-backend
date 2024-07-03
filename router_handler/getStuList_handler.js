const db = require('../db/index');
const logger = require('../modules/logger');

exports.getStuList = (req, res) => {
  let { user_id } = req.body;
  const query = `SELECT s.*, st.stu_id, name
                 FROM score s
                          JOIN stu st ON s.score_id = st.stu_id
                          JOIN user ON s.score_id = user_id
                 WHERE s.score_id = ?;
  `;

  db.query(query, [user_id], (err, rows) => {
    if (err) {
      logger.error('查询数据库时出错:', err);
      return res.status(500).send('查询数据库时出错');
    }
    logger.info('获取学生信息成功');
    const userInfo = rows[0];

    res.status(200).json(userInfo);
  });
};
