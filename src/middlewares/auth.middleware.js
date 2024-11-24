const JwtService = require('../services/shared/jwt.service');
const jwtService = new JwtService();
const status = require('../constants/status');

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.fail('Access denied. No token provided.', status.UNAUTHORIZED);
        }

        const decoded = jwtService.verifyToken(token);
        if (!decoded) {
            return res.fail('Invalid token.', status.UNAUTHORIZED);
        }
        
        req.userId = decoded.user.id;

        next();
    } catch (err) {
        return res.fail('Invalid token.', status.UNAUTHORIZED);
    }
};

module.exports = { isAuthenticated };
