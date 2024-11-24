const { sequelize } = require('../sequelize');
const ProjectRepository = require('../repositories/project.repository');
const UserRepository = require('../repositories/user.repository');
const UserProjectRepository = require('../repositories/user-project.repository');

class ProjectService {
    constructor() {
        this.projectRepository = new ProjectRepository();
        this.userRepository = new UserRepository();
        this.userProjectRepository = new UserProjectRepository();
    }

    async create(userId, projectData) {
        const transaction = await sequelize.transaction();
        try {
            const project = await this.projectRepository.create(projectData, transaction);

            await this.addUserToProject(project.id, userId, transaction);
            
            await transaction.commit();
            return project;
        } catch (error) {
            await transaction.rollback();
            throw new Error('Unable to create project this time: ' + error.message);
        }
    }

    async addUserToProject(projectId, userId, transaction) {
        try {
            const user = await this.userRepository.getById(userId);
            if (!user) {
                throw new Error(`User with ID ${userId} does not exist`);
            }
        
            const userProjectData = {
                projectId,
                userId
            };
        
            return await this.userProjectRepository.create(userProjectData, transaction);
        } catch (error) {
            throw new Error('Unable to add user to project this time: ' + error.message);
        }
    }

    async inviteUserToProject(projectId, userId) {
        const transaction = await sequelize.transaction();
        try {
            const project = await this.projectRepository.getById(projectId);
            if (!project) {
                throw new Error(`Project with ID ${projectId} does not exist`);
            }

            const userProject = await this.userProjectRepository.getByUserAndProjectId(userId, projectId);
            if (userProject) {
                throw new Error('User is already part of the project');
            }

            await this.addUserToProject(projectId, userId, transaction);

            await transaction.commit();
            return true;
        } catch (error) {
            await transaction.rollback();
            throw new Error('Unable to invite user to project this time: ' + error.message);
        }
    }

    async getById(id) {
        return await this.projectRepository.getById(id);
    }

    async getByUserId(userId) {
        return await this.projectRepository.getByUserId(userId);
    }

    async update(id, projectData) {
        return await this.projectRepository.update(id, projectData);
    }

    async delete(id) {
        return await this.projectRepository.delete(id);
    }
} 

module.exports = ProjectService;