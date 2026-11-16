const mysql = require('mysql2');
const env = require('dotenv');
env.config();
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

db.connect((err)=>{ 
    try {
        if(err) throw err;
        console.log('Connected to the database');
    } catch (error) {
        console.log('Error connecting to the database',err);
    }
});

module.exports = db;