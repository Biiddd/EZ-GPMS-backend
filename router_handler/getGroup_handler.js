const db = require('../db/index');
const logger = require('../modules/logger');

exports.get = (req, res) => {
  // let { group_id } = req.body;
  const query = `
      SELECT g.group_id,
             GROUP_CONCAT(DISTINCT CONCAT(u1.name) ORDER BY stu.stu_id SEPARATOR ',')         AS stu_list,
             GROUP_CONCAT(DISTINCT CONCAT(u2.name) ORDER BY teacher.teacher_id SEPARATOR ',') AS teacher_list
      FROM \`group\` g
               LEFT JOIN
           stu ON stu.stu_group_id = g.stu_group_id
               LEFT JOIN
           \`user\` u1 ON stu.stu_id = u1.user_id
               LEFT JOIN
           teacher ON teacher.teacher_group_id = g.teacher_group_id
               LEFT JOIN
           \`user\` u2 ON teacher.teacher_id = u2.user_id
      GROUP BY g.group_id;`;

  db.query(query, [], (err, rows) => {
    if (err) {
      logger.error('查询数据库时出错:', err);
      return res.status(200).json({ code: 200500, msg: '查询数据库时出错' });
    }
    logger.info('获取分组数据成功');
    res.status(200).json({ code: 200, msg: '获取分组数据成功', data: rows });
  });
};
