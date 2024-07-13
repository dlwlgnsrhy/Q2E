const mysql = require('mysql2/promise');

async function getMySQLConnection() {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345',
        database: 'surfun'
    });
}

module.exports = getMySQLConnection;
