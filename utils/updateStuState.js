const db = require('../db/index');
const logger = require('../modules/logger');

function updateStuState(stu_id) {
  // 查询学生成绩和文件提交情况
  const queryStu = `SELECT
         s.stu_id,
         sc.transScore,
         sc.startScore,
         sc.midScore,
         sc.teachScore,
         sc.readScore,
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
  // 初始状态都为0
  // 更新学生状态
  const setStuState = `UPDATE stu set stu_states = ? WHERE stu_id = ?`;

  //开题

  db.query(queryStu, [stu_id], (err, result) => {
    if (err) {
      logger.error(`查询学生 ${stu_id}错误: ${err.message}`);
      logger.error('更新状态失败');
      return;
    }
    // 如果学生的答辩申请文件不为空且答辩成绩不为空，则更新学生状态为答辩结束,等待总分，设置状态5
    if (result[0].defenseApply_file && result[0].defScore) {
      db.query(setStuState, [5, stu_id]);
      logger.info('更新学生{stu_id} 为 5');
    }
    // 如果学生的终稿文件不为空，并且评阅老师成绩不为空，则更新学生状态为上传答辩申请，设置状态4
    else if (result[0].final_file && result[0].readScore) {
      db.query(setStuState, [4, stu_id]);
      logger.info('更新学生${stu_id} 为 4');
    }
    // 如果学生的中期成绩和文件不为空，则更新学生状态为上传终稿，设置状态3
    else if (result[0].midWork_file && result[0].midReport_file && result[0].midScore) {
      db.query(setStuState, [3, stu_id]);
      logger.info('更新学生${stu_id} 为 3');
    }
    // 如果学生的开题成绩不为空，则更新学生状态为上传中期成果，设置状态2
    else if (result[0].startScore) {
      db.query(setStuState, [2, stu_id]);
      logger.info('更新学生${stu_id} 为 2');
    }
    // 如果开题和翻译成文件路径不为空，则更新学生状态为等待开题答辩，设置状态1
    else if (result[0].start_file && result[0].translation_file) {
      db.query(setStuState, [1, stu_id]);
      logger.info('更新学生${stu_id} 为 1');
    }
  });
}
const updateStu = updateStuState;
module.exports = updateStu;
