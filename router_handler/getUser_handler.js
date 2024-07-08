const db = require('../db/index');
const logger = require('../modules/logger');

exports.getStu = (req, res) => {
  let { user_id } = req.query;

  // 验证是否为管理员的SQL语句
  const authQuery = `
      SELECT type
      FROM user
      WHERE user_id = ?;
  `;

  // 执行鉴权查询
  db.query(authQuery, [user_id], (err, authResult) => {
    if (err) {
      logger.error('查询数据库时出错:', err);
      return res.status(200).json({ code: 200500, msg: '查询数据库时出错' });
    }

    // 检查是否为管理员
    if (authResult.length === 0 || authResult[0].type !== '管理员') {
      logger.error('非管理员尝试获取全部学生信息');
      return res.status(200).json({ code: 200403, msg: '权限不足' });
    }

    // 查询学生信息的SQL语句
    const query = `
      SELECT u.name,
             u.user_id,
             u.gender,
             u.age,
             s.stu_major,
             s.stu_class,
             u.tel
      FROM stu s
      JOIN user u ON s.stu_id = u.user_id
      WHERE u.type = '学生'
    `;

    // 执行学生信息查询
    db.query(query, [], (err, result) => {
      if (err) {
        logger.error('查询数据库时出错:', err);
        return res.status(200).json({ code: 500, msg: '查询数据库时出错' });
      }
      logger.info('管理员获取全部学生信息成功');
      res.status(200).json({ code: 200, msg: '管理员获取全部学生信息成功', data: result });
    });
  });
};

exports.getTeacher = (req, res) => {
  let { user_id } = req.query;

  // 验证是否为管理员的SQL语句
  const authQuery = `
      SELECT type
      FROM user
      WHERE user_id = ?;
  `;

  // 执行鉴权查询
  db.query(authQuery, [user_id], (err, authResult) => {
    if (err) {
      logger.error('查询数据库时出错:', err);
      return res.status(200).json({ code: 200500, msg: '查询数据库时出错' });
    }

    // 检查是否为管理员
    if (authResult.length === 0 || authResult[0].type !== '管理员') {
      logger.error('非管理员尝试获取全教师信息');
      return res.status(200).json({ code: 200403, msg: '权限不足' });
    }

    // 查询老师信息的SQL语句
    const query = `
      SELECT u.name,
             u.user_id,
             u.gender,
             u.age,
             t.title,
             u.tel
      FROM teacher t
      JOIN user u ON t.teacher_id = u.user_id
      WHERE u.type = '老师'
    `;

    // 执行学生信息查询
    db.query(query, [], (err, result) => {
      if (err) {
        logger.error('查询数据库时出错:', err);
        return res.status(200).json({ code: 500, msg: '查询数据库时出错' });
      }
      logger.info('管理员获取全部教师信息成功');
      res.status(200).json({ code: 200, msg: '管理员获取全部学生信息成功', data: result });
    });
  });
};
