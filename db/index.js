const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword",
    database: "gpms",
});

module.exports = db;
