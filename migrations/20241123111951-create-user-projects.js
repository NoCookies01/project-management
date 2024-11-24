'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('userProjects', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users', // Table name for User model
                    key: 'id'
                },
                onDelete: 'SET NULL', // Set `userId` to NULL if the user is deleted
                onUpdate: 'CASCADE' // Update the foreign key if the user ID changes
            },
            projectId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'projects', // Table name for Project model
                    key: 'id'
                },
                onDelete: 'CASCADE', // Automatically delete the entry if the project is deleted
                onUpdate: 'CASCADE' // Update the foreign key if the project ID changes
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
        await queryInterface.dropTable('userProjects');
    }
};
