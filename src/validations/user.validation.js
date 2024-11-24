const { check } = require('express-validator');

const createUserValidation = [
    check('name', 'Name is required').isString().not().isEmpty(),
    check('login', 'Login is required').not().isEmpty(),
    check(
        'password',
        'Please enter a password with 8 or more characters, at least one number, one uppercase letter',
    ).isLength({ min: 8 })
    .matches(/\d/)
    .matches(/[A-Z]/)
];

const loginValidation = [
    check('login', 'Login is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty()
];

module.exports = { 
    createUserValidation, 
    loginValidation 
};