const db = require('../db/index');
const logger = require('../modules/logger');
const replace_items = require('../modules/replace_item');
const { generateEvaluationFile } = require('../modules/slove_word');

// 教师下载学生文件逻辑
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
          logger.error('未找到文件');
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].start_file;
        logger.info('获取文件路径成功:', path);
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    case '外文翻译':
      const translation_file = `SELECT translation_file
                                FROM file
                                WHERE stu_id = ?`;
      db.query(translation_file, [user_id], (err, result) => {
        if (result.length === 0) {
          logger.error('未找到文件');
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].translation_file;
        logger.info('获取文件路径成功:', path);
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    case '中期成果':
      const midWork_file = `SELECT midWork_file
                            FROM file
                            WHERE stu_id = ?`;
      db.query(midWork_file, [user_id], (err, result) => {
        if (result.length === 0) {
          logger.error('未找到文件');
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].midWork_file;
        logger.info('获取文件路径成功:', path);
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    case '中期报告':
      const midReport_file = `SELECT midReport_file
                              FROM file
                              WHERE stu_id = ?`;
      db.query(midReport_file, [user_id], (err, result) => {
        if (result.length === 0) {
          logger.error('未找到文件');
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].midReport_file;
        logger.info('获取文件路径成功:', path);
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
          logger.error('未找到文件');
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].final_file;
        logger.info('获取文件路径成功:', path);
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    case '答辩申请表':
      const defenseApply_file = `SELECT defenseApply_file
                                 FROM file
                                 WHERE stu_id = ?`;
      db.query(defenseApply_file, [user_id], (err, result) => {
        if (result.length === 0) {
          logger.error('未找到文件');
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].defenseApply_file;
        logger.info('获取文件路径成功:', path);
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    default:
      return res.status(200).json({ code: 40001, msg: '不正确的文件名' });
  }
};

// 学生下载公共文件逻辑
exports.stuDownload = (req, res) => {
  let { file } = req.query;
  switch (file) {
    case '校外毕设申请表':
      const outSchool_file_template = `SELECT common_file_path
                                       FROM common_file
                                       WHERE common_file_name = ?`;
      db.query(outSchool_file_template, [file], (err, result) => {
        if (result.length === 0) {
          logger.error('未找到文件');
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].common_file_path;
        logger.info('获取文件路径成功:', path);
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    case '开题报告模板':
      const start_file_template = `SELECT common_file_path
                                   FROM common_file
                                   WHERE common_file_name = ?`;
      db.query(start_file_template, [file], (err, result) => {
        if (result.length === 0) {
          logger.error('未找到文件');
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].common_file_path;
        logger.info('获取文件路径成功:', path);
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    case '毕业论文模板':
      const final_file_template = `SELECT common_file_path
                                   FROM common_file
                                   WHERE common_file_name = ?`;
      db.query(final_file_template, [file], (err, result) => {
        if (result.length === 0) {
          logger.error('未找到文件');
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].common_file_path;
        logger.info('获取文件路径成功:', path);
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    case '答辩申请模板':
      const defenseApply_file_template = `SELECT common_file_path
                                          FROM common_file
                                          WHERE common_file_name = ?`;
      db.query(defenseApply_file_template, [file], (err, result) => {
        if (result.length === 0) {
          logger.error('未找到文件');
          return res.status(200).json({ code: 40002, msg: '未找到文件' });
        }
        const path = result[0].common_file_path;
        logger.info('获取文件路径成功:', path);
        return res.status(200).json({ code: 20000, path: path });
      });
      break;
    default:
      logger.error('不正确的文件名');
      return res.status(200).json({ code: 40001, msg: '不正确的文件名' });
  }
};

// 下载评价手册逻辑
exports.exportEvaluation = (req, res) => {
  const { stu_id } = req.query;
  const item_query = `SELECT
                             s.stu_id,
                             s.stu_major,
                             s.stu_class,
                             u1.name AS stu_name,
                             u2.name AS teacher_name,
                             t.title,
                             sc.transScore1,
                             sc.transScore2,
                             sc.transScore3,
                             sc.transScore,
                             sc.startScore1,
                             sc.startScore2,
                             sc.startScore3,
                             sc.startScore,
                             sc.midScore1,
                             sc.midScore2,
                             sc.midScore3,
                             sc.midScore,
                             sc.midEva,

                             sc.teachScore1,
                             sc.teachScore2,
                             sc.teachScore3,
                             sc.teachScore4,
                             sc.teachScore5,
                             sc.teachScore,
                             sc.teachEva,

                             sc.readScore1,
                             sc.readScore2,
                             sc.readScore3,
                             sc.readScore4,
                             sc.readScore,
                             sc.readEva,

                             sc.defRecord,

                             sc.defScore1,
                             sc.defScore2,
                             sc.defScore3,
                             sc.defScore4,
                            sc.defScore,
                             sc.defEva,

                             sc.finalScore,
                             sc.finalEva

                           FROM
                             user u1
                               JOIN
                             stu s ON u1.user_id = s.stu_id
                               JOIN
                             user u2 ON s.stu_guide_id = u2.user_id
                               JOIN
                             score sc ON s.stu_id = sc.stu_id
                               JOIN
                             teacher t on s.stu_guide_id = t.teacher_id
                           where s.stu_id =?`;
  db.query(item_query, [stu_id], (err, result) => {
    if (err) {
      logger.error('查询数据库时出错:', err);
      return res.status(200).json({ code: 50001, msg: '查询数据库时出错' });
    }
    if (result.length === 0) {
      logger.error('未找到用户信息');
      return res.status(200).json({ code: 40002, msg: '未找到用户信息' });
    }
    for (let key in result[0]) {
      if (result[0][key] === null || result[0][key] === '') {
        logger.warn(`${result[0].stu_id}的${key}为空, 无法生成评价手册`);
        return res
          .status(200)
          .json({ code: 40002, msg: `${result[0].stu_id}的${key}为空, 无法生成评价手册` });
      }
    }
    logger.info(`数据校验成功, 开始生${stu_id}成评价手册`);

    replace_items.replace = {
      name: result[0].stu_name,
      major: result[0].stu_major,
      class: result[0].stu_class,
      stu_id: result[0].stu_id,
      teacher_name: result[0].teacher_name,
      title: result[0].title,
      startScore1: result[0].startScore1,
      startScore2: result[0].startScore2,
      startScore3: result[0].startScore3,
      startScore: result[0].startScore,
      transScore1: result[0].transScore1,
      transScore2: result[0].transScore2,
      transScore3: result[0].transScore3,
      transScore: result[0].transScore,
      midScore1: result[0].midScore1,
      midScore2: result[0].midScore2,
      midScore3: result[0].midScore3,
      midScore: result[0].midScore,
      midEva: result[0].midEva,
      teachScore1: result[0].teachScore1,
      teachScore2: result[0].teachScore2,
      teachScore3: result[0].teachScore3,
      teachScore4: result[0].teachScore4,
      teachScore5: result[0].teachScore5,
      teachScore: result[0].teachScore,
      teachEva: result[0].teachEva,
      readScore1: result[0].readScore1,
      readScore2: result[0].readScore2,
      readScore3: result[0].readScore3,
      readScore4: result[0].readScore4,
      readScore: result[0].readScore,
      readEva: result[0].readEva,
      defScore1: result[0].defScore1,
      defScore2: result[0].defScore2,
      defScore3: result[0].defScore3,
      defScore4: result[0].defScore4,
      defScore: result[0].defScore,
      defEva: result[0].defEva,
      defRecord: result[0].defRecord,
      finalScore: result[0].finalScore,
      finalEva: result[0].finalEva
    };

    generateEvaluationFile(replace_items.replace, (err, filePath) => {
      if (err) {
        logger.error('生成评价手册时出错:', err);
        return res.status(200).json({ code: 50001, msg: `生成学生${stu_id}评价手册时出错` });
      }
      return res
        .status(200)
        .json({ code: 20000, msg: `生成学生${stu_id}评价手册成功`, path: filePath });
    });
  });
};
