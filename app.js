const express = require('express');
const logger = require('./modules/logger');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// 获取信息
const getInfoRouter = require('./router/api/getInfo');
app.use(getInfoRouter);

// 获取状态
const getStateRouter = require('./router/api/getState');
app.use(getStateRouter);

// 获取成绩
const getScoreRouter = require('./router/api/getScore');
app.use(getScoreRouter);

// 修改密码
const changePasswdRouter = require('./router/api/changePasswd');
app.use(changePasswdRouter);

// 获取学生信息
const getStuListRouter = require('./router/api/getStuList');
app.use(getStuListRouter);

// 上传说明书和指导书
const uploadAskRouter = require('./router/api/uploadAsk');
app.use(uploadAskRouter);

app.listen(5174, () => {
  logger.info('服务启动成功, 监听端口 5174');
});
