const db = require('../db/index');
const logger = require('../modules/logger');

exports.getFullInfo = (req, res) => {
  let { user_id } = req.body;

  const query = `SELECT user_id, name, gender, age, province, city, area, tel, email, detailAdd, user_pic,type
                 FROM user
                 WHERE user_id = ?`;

  db.query(query, [user_id], (err, rows) => {
    if (err) {
      logger.error('查询数据库时出错:', err);
      return res.status(500).send('查询数据库时出错');
    }
    logger.info('获取信息成功');
    // 构造基本信息
    const userInfo = {
      user_id: rows[0].user_id,
      name: rows[0].name,
      gender: rows[0].gender,
      age: rows[0].age,
      type: rows[0].type,
      class: '',
      major: '',
      title: '',
      stuGroup: null,
      teacherGroup: null,
      tel: rows[0].tel,
      email: rows[0].email,
      user_pic: rows[0].user_pic,
      region: {
        province: rows[0].province,
        city: rows[0].city,
        area: rows[0].area,
        town: ''
      },
      detailAdd: rows[0].detailAdd
    };
    // 如果是老师，获取职称和教师组id
    if (userInfo.type === '老师') {
      db.query(
        `select title, teacher_group_id
                from teacher
                where teacher_id = ?`,
        [user_id],
        (err, rows) => {
          userInfo.title = rows[0].title;
          userInfo.teacherGroup = rows[0].teacher_group_id;
          res.status(200).json(userInfo);
        }
      );
    }
    // 如果是学生，获取班级和专业和学生组id
    else if (userInfo.type === '学生') {
      db.query(
        `select stu_class, stu_major,stu_group_id
         from stu
         where stu_id = ?`,
        [user_id],
        (err, rows) => {
          userInfo.class = rows[0].stu_class;
          userInfo.major = rows[0].stu_major;
          userInfo.stuGroup = rows[0].stu_group_id;
          res.status(200).json(userInfo);
        }
      );
    }
  });
};

exports.getEditInfo = (req, res) => {
  let { user_id } = req.body;
  const query = `SELECT user_id, province, city, area, tel, email, detailAdd
                 FROM user
                 WHERE user_id = ?`;

  db.query(query, [user_id], (err, rows) => {
    if (err) {
      logger.error('查询数据库时出错:', err);
      return res.status(500).send('查询数据库时出错');
    }

    if (rows.length === 0) {
      logger.error('未找到匹配的用户信息');
      return res.status(404).send('未找到匹配的用户信息');
    }

    logger.info('获取信息成功');
    const userInfo = {
      user_id: rows[0].user_id,
      tel: rows[0].tel,
      email: rows[0].email,
      region: {
        province: rows[0].province,
        city: rows[0].city,
        area: rows[0].area,
        town: ''
      },
      detailAdd: rows[0].detailAdd
    };

    res.status(200).json(userInfo);
  });
};

exports.updateInfo = (req, res) => {
  let {
    user_id,
    tel,
    email,
    region: { province, city, area },
    detailAdd
  } = req.body;

  const query = `UPDATE user
                 SET tel       = ?,
                     email     = ?,
                     province  = ?,
                     city      = ?,
                     area      = ?,
                     detailAdd = ?
                 WHERE user_id = ?`;

  db.query(query, [tel, email, province, city, area, detailAdd, user_id], (err) => {
    if (err) {
      logger.error('写入数据库时出错:', err);
      return res.status(500).send('写入数据库时出错');
    }
    logger.info('用户' + user_id + '信息修改成功');
    return res.status(200).send('信息修改成功');
  });
};
