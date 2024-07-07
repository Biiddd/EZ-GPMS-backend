# 软工课设-后端部分
## 技术栈
- 开发平台: WebStorm
- 框架: Express
- 数据库: MySQL
- 日志: Winston

## 运行
1. 安装依赖
选择你喜欢的一种包管理器安装依赖
    ```shell
    npm i
    或者
    pnpm i
    或者
    yarn i
    ```
    如果安装缓慢或者，可以尝试使用淘宝镜像

2. 修改数据库连接文件
    修改`~/db/index.js`文件中的`host`, `user`, `password`, `database`字段
    ```javascript
    const mysql = require('mysql2');

    const db = mysql.createConnection({
      host: 'localhost',
      user: 'yourusername',
      password: 'yourpassword',
      database: 'yourdatabase'
    });
    
    module.exports = db;
    ```

3. 初始化数据库
   运行`~/db/setup.sql`文件，初始化数据库

4. 运行
   1. 运行文件服务器
       ```shell
       # 新建一个uploads文件夹
       touch uploads
       # 当前文件夹下运行，指定端口3333并允许跨域
       http-server -p 3333 --cors
       ```
   2. 运行后端服务器
    <br>使用nodemon运行可以热更新，方便开发
   - 使用命令行
       ```shell
        nodemon app.js
       ```
   - 在WebStorm中配置nodemon运行
     ```shell
     Edit Configurations
     Node parameters ==> node_modules/nodemon/bin/nodemon.js
     JavaScript file ==> app.js
     ```
