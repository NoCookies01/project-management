const TaskRepository = require('../repositories/task.repository');
const taskRepository = new TaskRepository();
const status = require('../constants/status');



const isOwner = async (req, res, next) => {
    const { taskId } = req.params;
    //const userId = req.userId;

    try {
        // ADDITIONAL MIDDLEWARE IN CASE IF WE NEED TO BE SURE USER CAN ACCESS ONLY HIS/HER OWN TASKS

        //const userTask = await taskRepository.getByIdAndUserId(taskId, userId);
        //if (!userTask) {
        //    return res.fail('Task not found or this task does not belong to you', status.NOT_FOUND);
        //}

        const task = await taskRepository.getById(taskId);
        if (!task) {
            return res.fail('Task not found', status.NOT_FOUND);
        }

        req.task = task;

        next();
    } catch (error) {
        return res.fail(error.message, status.INTERNAL_SERVER_ERROR);
    }
}

module.exports = { isOwner };
