const express = require('express');
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const db = require('../db/index');
const logger = require('../modules/logger');
import { replace } from './replace_item';
const app = express();

app.get('/generateEvaluation', (req, res) => {
  const { user_id } = req.query;

  const user_info_query = `SELECT * FROM user,score,stu,teacher WHERE stu.stu_id = 202422222222 and score.stu_id=user_id and user.user_id=stu.stu_id and stu_guide_id=teacher.teacher_id`;
  db.query(user_info_query, [202422222222], (err, result) => {
    if (err) {
      logger.error('查询数据库时出错:', err);
      return res.status(200).json({ code: 50001, msg: '查询数据库时出错' });
    }
    if (result.length === 0) {
      logger.error('未找到用户信息');
      return res.status(200).json({ code: 40002, msg: '未找到用户信息' });
    }

    replace = {
      name: result[0].name,
      major: result[0].stu_major,
      class: result[0].stu_class,
      stu_id: result[0].stu_id,
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

    generateEvaluationFile(replace, (err, filePath) => {
      if (err) {
        logger.error('生成评价手册时出错:', err);
        return res.status(200).json({ code: 50002, msg: '生成评价手册时出错' });
      }

      logger.info('生成评价手册成功:', filePath);
      return res.status(200).json({ code: 20000, path: filePath });
    });
  });
});

function generateEvaluationFile(replace, callback) {
  const templatePath = path.join(__dirname, 'download', '评价手册.docx');
  const outputPath = path.join(__dirname, 'generated', `evaluation_${replace.name}.docx`);

  fs.readFile(templatePath, 'binary', (err, data) => {
    if (err) {
      return callback(err);
    }

    const zip = new PizZip(data);
    const doc = new Docxtemplater(zip);

    // 使用数据库中的数据替换模板中的占位符
    doc.setData({
      name: replace.name,
      major: replace.major,
      class: replace.class,
      stu_guid: replace.tename,
      stu_id: replace.stu_id,
      title: replace.title,
      startScore1: replace.startScore1,
      startScore2: replace.startScore2,
      startScore3: replace.startScore3,
      startScore: replace.startScore,
      transScore1: replace.transScore1,
      transScore2: replace.transScore2,
      transScore3: replace.transScore3,
      transScore: replace.transScore,
      midScore1: replace.midScore1,
      midScore2: replace.midScore2,
      midScore3: replace.midScore3,
      midScore: replace.midScore,
      midEva: replace.midEva,
      teachScore1: replace.teachScore1,
      teachScore2: replace.teachScore2,
      teachScore3: replace.teachScore3,
      teachScore4: replace.teachScore4,
      teachScore5: replace.teachScore5,
      teachScore: replace.teachScore,
      teachEva: replace.teachEva,
      readScore1: replace.readScore1,
      readScore2: replace.readScore2,
      readScore3: replace.readScore3,
      readScore4: replace.readScore4,
      readScore: replace.readScore,
      readEva: replace.readEva,
      defScore1: replace.defScore1,
      defScore2: replace.defScore2,
      defScore3: replace.defScore3,
      defScore4: replace.defScore4,
      defScore: replace.defScore,
      defEva: replace.defEva,
      defRecord: replace.defRecord,
      finalScore: replace.finalScore,
      finalEva: replace.finalEva
    });

    try {
      // 渲染文档
      doc.render();
    } catch (error) {
      const e = {
        name: error.name
      };
      console.log(JSON.stringify({ error: e }));
      return callback(error);
    }

    const buf = doc.getZip().generate({ type: 'nodebuffer' });

    fs.writeFile(outputPath, buf, (err) => {
      if (err) {
        return callback(err);
      }

      callback(null, outputPath);
    });
  });
}

app.get('/download/evaluation', (req, res) => {
  const { path: filePath } = req.query;

  res.download(filePath, '评价手册.docx', (err) => {
    if (err) {
      logger.error('下载文件时出错:', err);
      return res.status(500).send('下载文件时出错');
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
