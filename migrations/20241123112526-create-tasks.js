'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('tasks', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('todo', 'inProgress', 'done'),
                allowNull: false,
                defaultValue: 'todo'
            },
            projectId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'projects', // Name of the 'projects' table
                    key: 'id'
                },
                onDelete: 'CASCADE', // Automatically delete tasks if the associated project is deleted
                onUpdate: 'CASCADE' // Update tasks if the project ID changes
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users', // Name of the 'users' table
                    key: 'id'
                },
                onDelete: 'SET NULL', // Set `userId` to NULL if the user is deleted
                onUpdate: 'CASCADE' // Update tasks if the user ID changes
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
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_tasks_status";');
        await queryInterface.dropTable('tasks');
    }
};
