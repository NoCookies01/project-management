const express = require('express');
const router = express.Router();
const { getById, getByUserId, create, invite } = require('../../controllers/project.controller');
const { createTask, updateTask, deleteTask } = require('../../controllers/task.controller');
const { isAuthenticated } = require('../../middlewares/auth.middleware');
const { isOwner } = require('../../middlewares/ownership.middleware');
const {
    createProjectValidation,
    inviteToProjectValidation,
    createTaskValidation,
    updateTaskValidation
} = require('../../validations/project.validation');

router.get('/:projectId', isAuthenticated, getById);
router.get('/', isAuthenticated, getByUserId);
router.post('/', isAuthenticated, createProjectValidation, create);
router.post('/:projectId/invite', isAuthenticated, inviteToProjectValidation, invite);

router.post('/:projectId/tasks', isAuthenticated, createTaskValidation, createTask);
router.put('/:projectId/tasks/:taskId', isAuthenticated, isOwner, updateTaskValidation, updateTask);
router.delete('/:projectId/tasks/:taskId', isAuthenticated, isOwner, deleteTask);

module.exports = router;
