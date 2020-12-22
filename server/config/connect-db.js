const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'myadmin',
    database: 'register_v1',
    multipleStatements: true
});

db.connect((err) => {
    if(err) {
        console.error(err)
    } else {
        console.log('Connected database...')
    }
});

module.exports = db;