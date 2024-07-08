const db = require('../db/index');
const logger = require('../modules/logger');
const updateStu = require('../utils/updateStuState');

exports.updateScore = (req, res) => {
  let {
    stu_id,
    transScore1,
    transScore2,
    transScore3,

    startScore1,
    startScore2,
    startScore3,

    midScore1,
    midScore2,
    midScore3,
    midEva,

    teachScore1,
    teachScore2,
    teachScore3,
    teachScore4,
    teachScore5,
    teachEva,

    // 评阅老师
    readScore1,
    readScore2,
    readScore3,
    readScore4,
    readEva,

    // 答辩记录
    defRecord,

    // 答辩小组
    defScore1,
    defScore2,
    defScore3,
    defScore4,
    defEva,

    // 委员会总评
    finalEva
  } = req.body;

  const query = `UPDATE score
                 SET transScore1 = ?,
                     transScore2 = ?,
                     transScore3 = ?,
                     
                     startScore1 = ?,
                     startScore2 = ?,
                     startScore3= ?,
                        
                    midScore1 = ?,
                    midScore2 = ?,
                    midScore3 = ?,
                    midEva = ?,
                    
                    teachScore1 = ?,
                    teachScore2 = ?,
                    teachScore3 = ?,
                    teachScore4 = ?,
                    teachScore5 = ?,
                    teachEva = ?,
                    
                    readScore1 = ?,
                    readScore2 = ?,
                    readScore3 = ?,
                    readScore4 = ?,
                    readEva = ?,
                    
                    defRecord = ?,
                    
                    defScore1 = ?,
                    defScore2 = ?,
                    defScore3 = ?,
                    defScore4 = ?,
                    defEva = ?,
                    
                    finalEva = ?
                    
                 WHERE stu_id = ?`;

  db.query(
    query,
    [
      transScore1,
      transScore2,
      transScore3,

      startScore1,
      startScore2,
      startScore3,

      midScore1,
      midScore2,
      midScore3,
      midEva,

      teachScore1,
      teachScore2,
      teachScore3,
      teachScore4,
      teachScore5,
      teachEva,

      readScore1,
      readScore2,
      readScore3,
      readScore4,
      readEva,

      defRecord,

      defScore1,
      defScore2,
      defScore3,
      defScore4,
      defEva,

      finalEva,

      stu_id
    ],
    (err) => {
      if (err) {
        logger.error('查询数据库时出错:', err);
        return res.status(500).send('查询数据库时出错');
      }
      logger.info('更新成绩成功');
      updateStu(stu_id);
      res.status(200).send('更新成绩成功');
    }
  );
};
