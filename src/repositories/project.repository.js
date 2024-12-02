const {
    user: User,
    project: Project,
    task: Task,
    history: History
} = require('../sequelize');

class ProjectRepository {
    async create(projectData, transaction) {
        return await Project.create(projectData, { transaction });
    }

    async getById(id) {
        return await Project.findByPk(id, {
            include: [
                {
                    model: Task,
                    as: 'task',
                    required: false,
                    separate: true,
                    include: [
                        {
                            model: History,
                            as: 'history',
                            required: false,
                            separate: true
                        }
                    ]
                }
            ]
        });
    }

    async getByName(name) {
        return await Project.findOne({
            where: {
                name
            }
        });
    }

    async getByUserId(id) {
        return await User.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Project,
                    as: 'project',
                    required: true,
                    include: [
                        {
                            model: Task,
                            as: 'task',
                            required: false,
                            separate: true,
                            include: [
                                {
                                    model: History,
                                    as: 'history',
                                    required: false,
                                    separate: true
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    }

    async update(id, projectData) {
        return await Project.update(projectData, {
            where: {
                id
            }
        });
    }

    async delete(id) {
        return await Project.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = ProjectRepository;