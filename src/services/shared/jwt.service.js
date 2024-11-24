const jwt = require('jsonwebtoken');
const config = require('../../../config');

class JwtService {
    generateToken(user) {
        const payload = { 
            user: { 
                id: user.id
            } 
        };
        return jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.JWT_TOKEN_EXPIRES_IN });
    }

    verifyToken(token) {
        return jwt.verify(token, config.JWT_SECRET);
    }
}

module.exports = JwtService;