const responseHandler = (res, message, data, status = 200) => {
    res.status(status).json({
        message,
        data,
    });
};
  
const errorHandler = (res, message, status = 500) => {
    res.status(status).json({
        error: message,
    });
};

module.exports = {
    responseHandler,
    errorHandler,
};