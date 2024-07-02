const db = require("../db/index");
const logger = require("../modules/logger");

exports.scoreTable = (req, res) => {
    // 执行数据库查询
    const query = `
        SELECT 
            score_id, 
            startScore as column2, startEva as column3,
            transScore as column2, transEva as column3,
            midScore as column2, midEva as column3,
            teachScore as column2, teachEva as column3,
            readScore as column2, readEva as column3,
            defScore as column2, defEva as column3,
            finalScore as column2, finalEva as column3
        FROM 
            score`;

    db.query(query, (err, results) => {
        if (err) {
            logger.error("从数据库查询数据时出错:", err);
            return res.status(500).json({ error: '从数据库查询数据时出错' });
        }

        // 将查询结果处理为前端需要的格式并发送到前端
        const formattedData = results.map((item, index) => ({
            key: (index + 1).toString(),
            column1: getColumn1Text(index + 1),
            column2: item.column2,
            column3: item.column3,
        }));

        res.json(formattedData);
    });
};

// 根据索引生成对应的文本
function getColumn1Text(index) {
    switch (index) {
        case 1: return '开题报告';
        case 2: return '外文翻译';
        case 3: return '中期检查';
        case 4: return '指导老师';
        case 5: return '评阅老师';
        case 6: return '答辩小组';
        case 7: return '委员会总评';
        default: return '';
    }
}
