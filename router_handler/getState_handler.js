const db = require('../db/index');
const logger = require('../modules/logger');

exports.getInfo = (req, res) => {
  let { user_id } = req.body;
  const query = `SELECT stu_states
                 FROM stu
                 WHERE stu_id = ?`;

  db.query(query, [user_id], (err, rows) => {
    if (err) {
      logger.error('查询数据库时出错:', err);
      return res.status(500).send('查询数据库时出错');
    }
    logger.info('获取学生状态成功');
    const userInfo = rows[0];

    res.status(200).json(userInfo);
  });
};

exports.getTeacherState = (req, res) => {
  let { teacher_type, stu_id } = req.body;
  // 查询学生成绩和文件提交情况
  const query = `SELECT
         s.stu_id,
         sc.transScore,
         sc.startScore,
         sc.midScore,
         sc.teachScore,
         sc.readScore,
         sc.defRecord,
         sc.defScore,
         sc.finalScore,
         sc.finalEva,
         f.translation_file,
         f.start_file,
         f.midReport_file,
         f.midWork_file,
         f.defenseApply_file,
         f.final_file
     FROM stu s
              JOIN score sc ON s.stu_id = sc.stu_id
              LEFT JOIN file f ON s.stu_id = f.stu_id
     WHERE s.stu_id = ?`;

  db.query(query, [stu_id], (err, result) => {
    if (err) {
      logger.error(`查询学生 ${req.body.stu_id}错误: ${err.message}`);
      logger.error('更新状态失败');
      return res.status(500).send('查询数据库时出错');
    }
    switch (true) {
      case result[0].translation_file === null:
        if (teacher_type === '指导教师') {
          res.status(200).json({
            code: 20041,
            msg: '翻译文件未上传，无法评分',
            data: {
              teacherState: 'cantSignTransScore',
              teacherStateCode: 0,
              showForm: true,
              disableForm: true,
              showUnAuthorized: false
            }
          });
          break;
        } else {
          res.status(200).json({
            code: 200403,
            msg: '您无权对该项进行评分',
            data: {
              teacherState: 'noAuth',
              teacherStateCode: 0,
              showForm: false,
              showUnAuthorized: true
            }
          });
          break;
        }

      case result[0].translation_file !== null && result[0].transScore === null:
        if (teacher_type === '指导教师') {
          res.status(200).json({
            code: 20050,
            msg: '翻译文件已上传，请评分',
            data: {
              teacherState: 'signTransScore',
              teacherStateCode: 0,
              showForm: true,
              disableForm: false,
              showUnAuthorized: false
            }
          });
          break;
        } else {
          res.status(200).json({
            code: 200403,
            msg: '您无权对该项进行评分',
            data: {
              teacherState: 'noAuth',
              teacherStateCode: 0,
              showForm: false,
              showUnAuthorized: true
            }
          });
          break;
        }

      case result[0].start_file === null:
        if (teacher_type === '组长') {
          res.status(200).json({
            code: 20041,
            msg: '学生开题报告未上传，无法评分',
            data: {
              teacherState: 'cantSignStartScore',
              teacherStateCode: 0,
              showForm: true,
              disableForm: true,
              showUnAuthorized: false
            }
          });
          break;
        } else {
          res.status(200).json({
            code: 200403,
            msg: '您无权对该项进行评分',
            data: {
              teacherState: 'noAuth',
              teacherStateCode: 0,
              showForm: false,
              showUnAuthorized: true
            }
          });
          break;
        }

      case result[0].start_file !== null && result[0].startScore === null:
        if (teacher_type === '组长') {
          res.status(200).json({
            code: 20050,
            msg: '学生开题报告已上传，请评分',
            data: {
              teacherState: 'signStartScore',
              teacherStateCode: 1,
              showForm: true,
              disableForm: false,
              showUnAuthorized: false
            }
          });
          break;
        } else {
          res.status(200).json({
            code: 200403,
            msg: '您无权对该项进行评分',
            data: {
              teacherState: 'noAuth',
              teacherStateCode: 1,
              showForm: false,
              showUnAuthorized: true
            }
          });
          break;
        }

      case result[0].midWork_file === null || result[0].midReport_file === null:
        if (teacher_type === '组长') {
          res.status(200).json({
            code: 20041,
            msg: '中期成果文件或中期报告文件未上传，无法评分',
            data: {
              teacherState: 'cantSignMidScore',
              teacherStateCode: 2,
              showForm: true,
              disableForm: true,
              showUnAuthorized: false
            }
          });
          break;
        } else {
          res.status(200).json({
            code: 200403,
            msg: '您无权对该项进行评分',
            data: {
              teacherState: 'noAuth',
              teacherStateCode: 2,
              showForm: false,
              showUnAuthorized: true
            }
          });
          break;
        }

      case result[0].midWork_file !== null &&
        result[0].midReport_file !== null &&
        result[0].midScore === null:
        if (teacher_type === '组长') {
          res.status(200).json({
            code: 20041,
            msg: '中期成果文件或中期报告文件已上传，请评分',
            data: {
              teacherState: 'SignMidScore',
              teacherStateCode: 2,
              showForm: true,
              disableForm: false,
              showUnAuthorized: false
            }
          });
          break;
        } else {
          res.status(200).json({
            code: 200403,
            msg: '您无权对该项进行评分',
            data: {
              teacherState: 'noAuth',
              teacherStateCode: 2,
              showForm: false,
              showUnAuthorized: true
            }
          });
          break;
        }

      case result[0].final_file === null:
        if (teacher_type === '指导教师') {
          res.status(200).json({
            code: 20041,
            msg: '终稿文件未上传，无法评分',
            data: {
              teacherState: 'cantSignTeachScore',
              teacherStateCode: 3,
              showForm: true,
              disableForm: true,
              showUnAuthorized: false
            }
          });
          break;
        } else {
          res.status(200).json({
            code: 200403,
            msg: '您无权对该项进行评分',
            data: {
              teacherState: 'noAuth',
              teacherStateCode: 3,
              showForm: false,
              showUnAuthorized: true
            }
          });
          break;
        }

      case result[0].final_file !== null && result[0].teachScore === null:
        if (teacher_type === '指导教师') {
          res.status(200).json({
            code: 20041,
            msg: '终稿文件已上传，请评分',
            data: {
              teacherState: 'SignTeachScore',
              teacherStateCode: 3,
              showForm: true,
              disableForm: false,
              showUnAuthorized: false
            }
          });
          break;
        } else {
          res.status(200).json({
            code: 200403,
            msg: '您无权对该项进行评分',
            data: {
              teacherState: 'noAuth',
              teacherStateCode: 3,
              showForm: false,
              showUnAuthorized: true
            }
          });
          break;
        }

      case result[0].teachScore !== null && result[0].readScore === null:
        if (teacher_type === '小组秘书兼评阅教师') {
          res.status(200).json({
            code: 20041,
            msg: '指导老师评分完成，请评分',
            data: {
              teacherState: 'SignReadScore',
              teacherStateCode: 4,
              showForm: true,
              disableForm: false,
              showUnAuthorized: false
            }
          });
          break;
        } else {
          res.status(200).json({
            code: 200403,
            msg: '您无权对该项进行评分',
            data: {
              teacherState: 'noAuth',
              teacherStateCode: 4,
              showForm: false,
              showUnAuthorized: true
            }
          });
          break;
        }

      case result[0].readScore !== null &&
        result[0].defenseApply_file === null &&
        result[0].defRecord === null:
        res.status(200).json({
          code: 20041,
          msg: '学生未上传答辩申请文件，无法填写答辩记录',
          data: {
            teacherState: 'cantSignDefRecord',
            teacherStateCode: 5,
            showForm: true,
            disableForm: true,
            showUnAuthorized: false
          }
        });
        break;

      case result[0].defenseApply_file !== null && result[0].defRecord === null:
        if (teacher_type === '小组秘书兼评阅教师') {
          res.status(200).json({
            code: 20041,
            msg: '学生已上传答辩申请文件，请填写答辩记录',
            data: {
              teacherState: 'SignDeRecord',
              teacherStateCode: 5,
              showForm: true,
              disableForm: false,
              showUnAuthorized: false
            }
          });
          break;
        } else {
          res.status(200).json({
            code: 200403,
            msg: '您无权对该项进行评分',
            data: {
              teacherState: 'noAuth',
              teacherStateCode: 5,
              showForm: false,
              showUnAuthorized: true
            }
          });
          break;
        }

      case result[0].defRecord !== null && result[0].defScore === null:
        if (teacher_type === '组长') {
          res.status(200).json({
            code: 20041,
            msg: '秘书已填写答辩记录，请填写答辩评分',
            data: {
              teacherState: 'SignDefScore',
              teacherStateCode: 6,
              showForm: true,
              disableForm: false
            }
          });
          break;
        } else {
          res.status(200).json({
            code: 200403,
            msg: '您无权对该项进行评分',
            data: {
              teacherState: 'noAuth',
              teacherStateCode: 6,
              showForm: false,
              showUnAuthorized: true
            }
          });
          break;
        }

      case result[0].defScore !== null && result[0].finalEva === null:
        if (teacher_type === '组长') {
          res.status(200).json({
            code: 20041,
            msg: '打分已完成，请填写最终评价',
            data: {
              teacherState: 'SignFinalEva',
              teacherStateCode: 7,
              showForm: true,
              disableForm: false
            }
          });
          break;
        } else {
          res.status(200).json({
            code: 200403,
            msg: '您无权对该项进行评分',
            data: {
              teacherState: 'noAuth',
              teacherStateCode: 7,
              showForm: false,
              showUnAuthorized: true
            }
          });
          break;
        }
      case result[0].finalEva !== null:
        res.status(200).json({
          code: 20041,
          msg: '该学生评分已完成',
          data: {
            teacherState: 'SignFinalEva',
            teacherStateCode: 7,
            showForm: false,
            disableForm: null,
            showEnd: true
          }
        });
        break;
      default:
        res.status(200).json({ code: 20040, msg: '获取失败' });
    }
  });
};
