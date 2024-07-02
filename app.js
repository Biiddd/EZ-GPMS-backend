const express = require("express");
const logger = require("./modules/logger");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

const changePasswdRouter = require("./router/api/changePasswd");
app.use(changePasswdRouter);

app.listen(5174, () => {
    logger.info("服务启动成功, 监听端口 5174");
});