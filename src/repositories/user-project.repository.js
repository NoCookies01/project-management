const {
    userProject: UserProject
} = require('../sequelize')

class UserProjectRepository {
    async getByUserAndProjectId(userId, projectId) {
        return await UserProject.findOne({
            where: {
                userId,
                projectId
            }
        });
    }
    
    async create(userProjectData, transaction) {
        return await UserProject.create(userProjectData, { transaction });
    }
}

module.exports = UserProjectRepository;