'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('histories', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('todo', 'inProgress', 'done'),
                allowNull: false
            },
            timestamp: {
                type: Sequelize.STRING,
                allowNull: false
            },
            taskId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'tasks', // Table name for the Task model
                    key: 'id'
                },
                onDelete: 'CASCADE', // Automatically delete histories if the task is deleted
                onUpdate: 'CASCADE' // Update histories if the task ID changes
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Drop the ENUM type before dropping the table to avoid conflicts
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_histories_status";');
        await queryInterface.dropTable('histories');
    }
};
