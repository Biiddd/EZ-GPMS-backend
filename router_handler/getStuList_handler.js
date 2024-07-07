const db = require('../db/index');
const logger = require('../modules/logger');

exports.getStuList = (req, res) => {
  let { user_id } = req.body;
  const query = `
      SELECT u.name, s.*
      FROM score s
               JOIN stu st ON s.stu_id = st.stu_id
               JOIN \`group\` g ON st.stu_group_id = g.stu_group_id
               JOIN teacher t ON g.teacher_group_id = t.teacher_group_id
               JOIN user u ON st.stu_id = u.user_id
      WHERE t.teacher_id = ?;
  `;

  db.query(query, [user_id], (err, rows) => {
    if (err) {
      logger.error('查询数据库时出错:', err);
      return res.status(500).send('查询数据库时出错');
    }
    logger.info('获取学生信息成功');

    res.status(200).json(rows);
  });
};
