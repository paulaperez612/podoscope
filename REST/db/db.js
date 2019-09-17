var mysql = require('mysql');

//local mysql db connection
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB, 
    port: process.env.DB_PORT,
    ssl: true
};

const pool = mysql.createPool(config);


module.exports = pool;