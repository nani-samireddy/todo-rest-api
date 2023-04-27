const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'todo',
    user: 'root',
    password: 'Root@123'
});

connection.connect(function (error) {
    if (error) {
        throw error;
    }
    else {
        console.log('MySQL Database is connected Successfully');
    }
});

connection.on('error', function (err) {
    console.log("[mysql error]", err);
});

module.exports = connection;
