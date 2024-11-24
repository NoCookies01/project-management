const { check } = require('express-validator');
const { taskStatuses } = require('../constants/types');

const createProjectValidation = [
    check('name', 'Name is required').isString().not().isEmpty()
];

const inviteToProjectValidation = [
    check('userId', 'User ID is required').isString().not().isEmpty()
];

const createTaskValidation = [
    check('name', 'Name is required').isString().not().isEmpty(),
    check('description', 'Description is required').isString().not().isEmpty()
];

const updateTaskValidation = [
    check('status', 'Status should be: todo, inProgress or done ').isIn(taskStatuses).optional()
];

module.exports = { 
    createProjectValidation, 
    inviteToProjectValidation,
    createTaskValidation,
    updateTaskValidation
};