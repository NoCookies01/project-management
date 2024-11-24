module.exports = (db) => {
    // Association between user and task || One to many
    db.user.hasMany(db.task, {foreignKey: 'userId', as: 'task'});
    db.task.belongsTo(db.user, {foreignKey: 'userId', as: 'user'});

    // Association between task and history || One to many
    db.task.hasMany(db.history, {foreignKey: 'taskId', as: 'history'});
    db.history.belongsTo(db.task, {foreignKey: 'taskId', as: 'task'});

    // Association between project and tasks || One to many
    db.project.hasMany(db.task, {foreignKey: 'projectId', as: 'task'});
    db.task.belongsTo(db.project, {foreignKey: 'projectId', as: 'project'});

    // Association between users and projects || Many to many
    db.user.belongsToMany(db.project, {through: 'userProject', foreignKey: 'userId', otherKey: 'projectId', as: 'project'});
    db.project.belongsToMany(db.user, {through: 'userProject', foreignKey: 'projectId', otherKey: 'userId', as: 'user'});
};