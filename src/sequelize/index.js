const dbConfig = require('./db.js');
const associations = require('./associations.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.development.database,
    dbConfig.development.username,
    dbConfig.development.password, {
        host: dbConfig.development.host,
        dialect: dbConfig.development.dialect,
        operatorsAliases: false,
        logging: console.log,
        pool: {
            max: 20,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        retry: {
            max: 3
        }
    },
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./dto/user.dto.js')(sequelize, DataTypes)
db.project = require('./dto/project.dto.js')(sequelize, DataTypes)
db.userProject = require('./dto/user-project.dto.js')(sequelize, DataTypes)
db.task = require('./dto/task.dto.js')(sequelize, DataTypes)
db.history = require('./dto/history.dto.js')(sequelize, DataTypes)

associations(db);

db.sequelize.sync({ force: false })

module.exports = db