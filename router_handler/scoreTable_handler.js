const db = require("../db/index");
const logger = require("../modules/logger");

exports.scoreTable = (req, res) => {
    const query = `SELECT startScore1, startScore2, startScore3, startScore, startEva,
            transScore1, transScore2, transScore3, transScore, transEva,
            midScore1, midScore2, midScore3, midScore, midEva,
            teachScore1, teachScore2, teachScore3, teachScore4, teachScore5, teachScore, teachEva,
            readScore1, readScore2, readScore3, readScore4, readScore, readEva,
            defScore1, defScore2, defScore3, defScore4, defScore, defEva, finalScore, finalEva
             FROM score`; // score是数据库成绩表名

    db.query(query, (err, results) => {
        if (err) {
            logger.error("从数据库查询数据时出错:", err);
            return res.status(500).json({ error: '从数据库查询数据时出错' });
        }

        // 将查询结果发送到前端
        res.json(results);
    });
};
