# EZ-GPMS

## Technology stack
- Develop Platform: WebStorm
- Framework: Express
- DataBase: MySQL 8.4
- Log: Winston

## How to Run
1. Install dependencies  
use your favorite package manager to install dependencies
    ```shell
    npm i
    # or
    pnpm i
    # or
    yarn i
    ```

2. Database Configuration  
    modify `host`, `user`, `password`, `database` in`~/db/index.js`
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

3. Initialize Database  
   run `~/db/setup.sql`

4. Run
   1. Run File Server
       ```shell
       # create uploads folder
       touch uploads
       # assign running port 3333 and allow cors
       http-server -p 3333 --cors
       ```
   2. Run Backend Server  
    using nodemon to run can hot update
   - use command line
       ```shell
        nodemon app.js
       ```
   - configure nodemon to run in WebStorm
     ```shell
     Edit Configurations
     Node parameters ==> node_modules/nodemon/bin/nodemon.js
     JavaScript file ==> app.js
     ```
