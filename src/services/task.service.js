const TaskRepository = require('../repositories/task.repository');
const { getIoInstance } = require('../sockets/io');
const {
    TASK_CREATED,
    TASK_UPDATED,
    TASK_MOVED
} = require('../sockets/events/task.event');

class TaskService {
    constructor() {
        this.taskRepository = new TaskRepository();
        this.io = getIoInstance();
    }

    async create(taskData) {
        try {
            const task = await this.taskRepository.create(taskData);

            this.emitTaskCreate(TASK_CREATED, task.projectId, task);

            return task;

        } catch (error) {
            throw new Error('Unable to create task this time: ' + error.message);
        }
    }

    async update(task, taskData) {
        try {
            const [updatedTask, history] = await Promise.all([
                this.updateTaskStatus(task, taskData),
                this.createTaskHistory(task, taskData)
            ]);
    
            const socketEvent = taskData.status ? TASK_MOVED : TASK_UPDATED;
    
            this.emitTaskUpdate(socketEvent, task.projectId, updatedTask, history);
    
            return { updatedTask, history };
        } catch (error) {
            throw new Error(`Unable to update task this time: ${error.message}`);
        }
    }

    async delete(task) {
        try {
            return await this.taskRepository.delete(task);
        } catch (error) {
            throw new Error('Unable to delete task this time: ' + error.message);
        }
    }

    async updateTaskStatus(task, taskData) {
        return task.update(taskData);
    }
    
    async createTaskHistory(task, taskData) {
        return this.taskRepository.createHistory({
            taskId: task.id,
            status: taskData.status || task.status,
            timestamp: new Date().toISOString(),
        });
    }

    emitTaskCreate(event, projectId, task) {
        this.io.to(`project_${projectId}`).emit(event, {
            taskId: task.id,
            projectId,
            task,
        });
    }
    
    emitTaskUpdate(event, projectId, updatedTask, history) {
        this.io.to(`project_${projectId}`).emit(event, {
            taskId: updatedTask.id,
            projectId,
            updatedTask,
            history,
        });
    }
}

module.exports = TaskService;