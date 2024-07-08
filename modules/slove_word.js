const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const DocxTemplater = require('docxtemplater');
const logger = require('./logger');

exports.generateEvaluationFile = (replace, callback) => {
  const baseDir = path.join(__dirname, '..');
  const templatePath = path.join(__dirname, '../template', '评价手册.docx');
  const outputPath = path.join(__dirname, `../uploads/${replace.stu_id}`, `evaluation_${replace.name}.docx`);

  fs.readFile(templatePath, 'binary', (err, data) => {
    if (err) {
      return callback(err);
    }

    const zip = new PizZip(data);
    const doc = new DocxTemplater(zip);

    // 使用数据库中的数据替换模板中的占位符
    doc.setData({
      name: replace.name,
      major: replace.major,
      class: replace.class,
      teacher_name: replace.teacher_name,
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
      logger.error(JSON.stringify({ error: e }));
      return callback(error);
    }

    const buf = doc.getZip().generate({ type: 'nodebuffer' });

    fs.writeFile(outputPath, buf, (error) => {
      if (error) {
        logger.error(`生成评价手册失败: ${error}`);
        return callback(error);
      }
      // 构造相对路径方便前端拼接url
      const relativePath = path.relative(baseDir, outputPath);
      logger.info(`生成评价手册成功: ${relativePath}`);
      callback(null, relativePath);
    });
  });
};
