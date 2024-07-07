const db = require('../db/index');
const logger = require('../modules/logger');
const bcrypt = require('bcrypt');

const isCorrect = (req, res) => {
  const { user_id, password } = req.body;

  const query = `
        SELECT password,type
        FROM user
        WHERE user_id = ?;
    `;

  db.query(query, [user_id], async (err, rows) => {
    if (err) {
      logger.error('数据库查询失败');
      return res.status(200).json({ code: 20005, message: '未知错误请重试', data: { type: '' } });
    }

    if (rows.length === 0) {
      // 用户名不存在
      logger.warn('用户名不存在');
      return res.status(200).json({ code: 20004, message: '用户名不存在', data: { type: '' } });
    }

    // 获取数据库中的密码哈希值
    //const passwordHash = rows[0].password;

    // 确保 passwordHash 不为空
    // if (!passwordHash) {
    //     // console.error('数据库中的密码哈希为空');
    //     return res.status(500).json({ error: "密码哈希为空" });
    // }

    // 比较输入的密码和数据库中的密码哈希值
    // const match = await bcrypt.compare(password, passwordHash);

    if (password === rows[0].password) {
      // 密码匹配，返回成功
      if (rows[0].type === '老师') {
        logger.info(rows[0].type);
        const teacherQuery = `
                    SELECT teacher_type
                    FROM teacher
                    WHERE teacher_id = ?;
                `;

        db.query(teacherQuery, [user_id], (err, teacherRows) => {
          // if (err) {
          //     logger.error("教师信息查询失败");
          //     return res.status(500).json({ error: "教师信息查询失败" });
          // }
          //
          // if (teacherRows.length === 0) {
          //     logger.warn("教师信息不存在");
          //     return res.status(401).json({ error: "教师信息不存在" });
          // }

          // 返回带有教师类型的信息
          logger.info('教师登录成功');
          return res.json({
            code: 20002,
            message: 'success',
            data: { type: teacherRows[0].teacher_type }
          });
        });
      } else {
        // 普通用户登录成功
        logger.info('登录成功');
        return res.json({ code: 20001, message: 'success', data: { type: rows[0].type } });
      }
    } else {
      // 密码不匹配
      logger.warn('密码不匹配');
      return res.status(200).json({ code: 20003, message: '用户名或密码错误', data: { type: '' } });
    }
  });
};

module.exports = {
  isCorrect
};
