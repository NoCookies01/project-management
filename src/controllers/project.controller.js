const { validationResult } = require('express-validator');
const ProjectService = require('../services/project.service');
const projectService = new ProjectService();
const status = require('../constants/status');

exports.getById = async (req, res) => {
    const { projectId } = req.params;

    try {
        const result = await projectService.getById(projectId);
        if (!result) {
            return res.fail('Project not found', status.NOT_FOUND);
        }

        return res.respond('Project retrieved successfully', result, status.OK);
    } catch (error) {
        return res.fail(error.message, status.INTERNAL_SERVER_ERROR);
    }
}

exports.getByUserId = async (req, res) => {
    const userId = req.userId;

    try {
        const result = await projectService.getByUserId(userId);
        if (!result) {
            return res.fail('No project found', status.NOT_FOUND);
        }

        return res.respond('Projects retrieved successfully', result, status.OK);
    } catch (error) {
        return res.fail(error.message, status.INTERNAL_SERVER_ERROR);
    }
}

exports.create = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.fail({ errors: errors.array() }, status.BAD_REQUEST);
    }

    const projectData = req.body;
    const userId = req.userId;

    try {
        const result = await projectService.create(userId, projectData);
        if (result.error) {
            return res.fail('Unable to create project this time', result.message, status.BAD_REQUEST);
        }

        return res.respond('Project created successfully', result, status.CREATED);
    } catch (error) {
        return res.fail(error.message, status.INTERNAL_SERVER_ERROR);
    }
}

exports.invite = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.fail({ errors: errors.array() }, status.BAD_REQUEST);
    }

    const { projectId } = req.params;
    const { userId } = req.body;

    try {
        const result = await projectService.inviteUserToProject(projectId, userId);
        if (!result) {
            return res.fail('Unable to invite user to project this time', status.BAD_REQUEST);
        }

        return res.respond('User invited to project successfully', status.OK);
    } catch (error) {
        return res.fail(error.message, status.INTERNAL_SERVER_ERROR);
    }
}