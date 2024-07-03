const db = require('../db/index');
const logger = require('../modules/logger');

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

exports.uploadAsk = (req, res) => {
  const { task, instruct } = req.body;
  const userId = '222222222222'; // 用户id默认为222222222222
  const sql = `INSERT INTO prefile (pre_id, task, instruct)
               VALUES (?, ?, ?)`;
  const values = [userId, task, instruct];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.log('Data inserted successfully');
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  });
};
