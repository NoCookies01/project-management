const {
    task: Task,
    history: History
} = require('../sequelize');

class TaskRepository {
    async getById(id) {
        return await Task.findByPk(id);
    }
    
    async getByIdAndUserId(id, userId) {
        return await Task.findOne({
            where: {
                id, userId
            }
        });
    }
    async create(taskData) {
        return await Task.create(taskData);
    }

    async update(task, taskData) {
        return await task.update(taskData);
    }

    async delete(task) {
        return await task.destroy();
    }

    async createHistory(historyData) {
        return await History.create(historyData);
    }
}

module.exports = TaskRepository;