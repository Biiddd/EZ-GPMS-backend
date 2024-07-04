const db = require('../db/index');
const logger = require('../modules/logger');

exports.getScore = (req, res) => {
  let { group_id } = req.body;
  const query = `
    SELECT *
    FROM stu_group
    JOIN teach_group ON stu_group.group_id = teach_group.group_id
    WHERE stu_group.group_id = ?`;

  db.query(query, [group_id], (err, rows) => {
    if (err) {
      logger.error('查询数据库时出错:', err);
      return res.status(500).send('查询数据库时出错');
    }
    logger.info('获取分组数据成功');
    const group = rows[0];

    res.status(200).json(group);
  });
};
