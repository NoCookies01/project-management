const { validationResult } = require('express-validator');
const UserService = require('../services/user.service');
const AuthService = require('../services/auth.service');
const userService = new UserService();
const authService = new AuthService();
const status = require('../constants/status');

exports.getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await userService.getById(id);
        if (!result) {
            return res.fail('User not found', status.NOT_FOUND);
        }

        return res.respond('User found', result, status.OK);
    } catch (error) {
        return res.fail(error.message, status.INTERNAL_SERVER_ERROR);
    }
}

exports.register = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.fail({ errors: errors.array() }, status.BAD_REQUEST);
    }

    const userData = req.body;

    try {
        const result = await userService.create(userData);
        if (!result) {
            return res.fail('User not created', status.BAD_REQUEST);
        }

        return res.respond('User created', result, status.CREATED);
    } catch (error) {
        return res.fail(error.message, status.INTERNAL_SERVER_ERROR);
    }
}

exports.login = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.fail({ errors: errors.array() }, status.BAD_REQUEST);
    }

    const loginData = req.body;

    try {
        const result = await authService.login(loginData);
        if (!result) {
            return res.fail('User not found', status.NOT_FOUND);
        }

        return res.respond('User logged in', result, status.OK);
    } catch (error) {
        return res.fail(error.message, status.INTERNAL_SERVER_ERROR);
    }
}