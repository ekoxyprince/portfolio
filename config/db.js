const dotenv = require('dotenv');
dotenv.config({
    path: "./.env"
})
const mysql = require("mysql");
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})
con.connect((err) => {
    if (err) throw err;
    console.log("connected to database")
})
module.exports = con;