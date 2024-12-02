const config = require('../../config');

module.exports = {
    development: {
        username: config.db.user,
        password: config.db.password,
        database: config.db.name,
        host: config.db.host,
        dialect: 'postgres'
    }, 
    production: {
        username: config.db.user,
        password: config.db.password,
        database: config.db.name,
        host: config.db.host,
        dialect: 'postgres'
    }
}