let ioInstance = null;

const setIoInstance = (io) => {
    ioInstance = io;
};

const getIoInstance = () => {
    if (!ioInstance) {
        throw new Error('Socket.io instance has not been initialized.');
    }
    return ioInstance;
};

module.exports = { setIoInstance, getIoInstance };
