const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/user.repository');
const JwtService = require('./shared/jwt.service');

class AuthService {
    constructor() {
        this.userRepository = new UserRepository();
        this.JwtService = new JwtService();
    }

    async login(loginData) {
        try {
            const user = await this.userRepository.getByLogin(loginData.login);
            if (!user) {
                throw new Error('User not found');
            }

            if (!await bcrypt.compare(loginData.password, user.password)) {
                throw new Error('Invalid credentials. Please try again');
            }

            const token = this.JwtService.generateToken(user);

            return {
                user,
                token
            };
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = AuthService;