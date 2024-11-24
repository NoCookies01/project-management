const {
    user: User
} = require('../sequelize');

class UserRepository {
    async create(userData) {
        return await User.create(userData);
    }

    async getAll() {
        return await User.findAll();
    }

    async getById(id) {
        return await User.findByPk(id);
    }

    async getByLogin(login) {
        return await User.findOne({
            where: {
                login
            }
        });
    }

    async update(id, userData) {
        return await User.update(userData, {
            where: {
                id
            }
        });
    }

    async delete(id) {
        return await User.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = UserRepository;