const express = require('express');
const router = express.Router();
const { getUser, register, login} = require('../../controllers/user.controller');
const { createUserValidation, loginValidation } = require('../../validations/user.validation');

router.get('/:id', getUser);
router.post('/register', createUserValidation, register);
router.post('/login', loginValidation, login);

module.exports = router;
