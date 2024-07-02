const db = require("../db/index");
const logger = require("../modules/logger");

exports.getInfo = (req, res) => {
    let {user_id} = req.body;
    const query = `SELECT stu_states FROM stu WHERE stu_id = ?`;

    db.query(query, [user_id], (err, rows) => {
        if (err) {
            logger.error("查询数据库时出错:", err);
            return res.status(500).send("查询数据库时出错");
        }
        logger.info("获取学生状态成功");
        const userInfo = rows[0];

        logger.info("userInfo: ", userInfo);
        res.status(200).json(userInfo);
    });
};