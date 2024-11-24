const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/user.repository');
const JwtService = require('./shared/jwt.service');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
        this.jwtService = new JwtService();
    }

    async create(userData) {
        try {
            const existedUser = await this.userRepository.getByLogin(userData.login);
            if (existedUser) {
                throw new Error('User with this login already exists. Please use different login');
            }

            userData.password = await bcrypt.hash(userData.password, 10);
            const user = await this.userRepository.create(userData);

            const token = this.jwtService.generateToken(user);

            return {
                token,
                user
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAll() {
        return await this.userRepository.getAll();
    }

    async getById(id) {
        return await this.userRepository.getById(id);
    }

    async getByLogin(login) {
        return await this.userRepository.getByLogin(login);
    }

    async update(id, userData) {
        return await this.userRepository.update(id, userData);
    }

    async delete(id) {
        return await this.userRepository.delete(id);
    }
}

module.exports = UserService;