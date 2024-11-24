const { validationResult } = require('express-validator');
const TaskService = require('../services/task.service');
const taskService = new TaskService();
const status = require('../constants/status');

exports.createTask = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.fail({ errors: errors.array() }, status.BAD_REQUEST);
    }

    const taskData = { 
        ...req.body,
        userId: req.userId,
        projectId: req.params.projectId
    };

    try {
        const result = await taskService.create(taskData);
        if (result.error) {
            return res.fail('Unable to create task this time', result.message, status.BAD_REQUEST);
        }

        return res.respond('Task created successfully', result, status.CREATED);
    } catch (error) {
        return res.fail(error.message, status.INTERNAL_SERVER_ERROR);
    }
};

exports.updateTask = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.fail({ errors: errors.array() }, status.BAD_REQUEST);
    }

    const task = req.task;
    const taskData = req.body;

    try {
        const result = await taskService.update(task, taskData);
        if (!result) {
            return res.fail('Task not found', status.NOT_FOUND);
        }

        return res.respond('Task updated successfully', result, status.OK);
    } catch (error) {
        return res.fail(error.message, status.INTERNAL_SERVER_ERROR);
    }
};

exports.deleteTask = async (req, res) => {
    const task = req.task;

    try {
        const result = await taskService.delete(task);
        if (!result) {
            return res.fail('Task not found', status.NOT_FOUND);
        }

        return res.respond('Task deleted successfully', result, status.OK);
    } catch (error) {
        return res.fail(error.message, status.INTERNAL_SERVER_ERROR);
    }
};