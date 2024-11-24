const { responseHandler, errorHandler } = require('../helpers/response.helper');

const configureResponses = (app) => {
    app.use((req, res, next) => {
        res.respond = (message, data, status) => responseHandler(res, message, data, status);
        res.fail = (message, status) => errorHandler(res, message, status);
        next();
    });
} 

module.exports = configureResponses;