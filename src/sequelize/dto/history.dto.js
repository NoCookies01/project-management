module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define("history", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        status: {
            type: DataTypes.ENUM('todo', 'inProgress', 'done'),
            allowNull: false
        },
        timestamp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        taskId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'tasks',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    })

    return History;
}