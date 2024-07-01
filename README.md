# 软工课设-后端部分
## 技术栈
- 开发平台: WebStorm
- 框架: Express
- 数据库: MySQL
- 日志: Winston

## 运行
1. 安装依赖
```shell
npm i
```
如果安装失败，可以尝试使用淘宝镜像，自行搜索，注意日期

2. 运行
使用nodemon运行可以热更新，方便开发 
- 使用命令行
```shell
nodemon app.js
```
- 在WebStorm中配置nodemon运行
```shell
//编辑配置 Edit Configurations

//节点形参 Node parameters
当前项目目录下的node_modules/nodemon/bin/nodemon.js

//JavaScript文件 JavaScript file
当前项目目录下的app.js
```