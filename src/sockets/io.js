let ioInstance = null;

const setIoInstance = (io) => {
    ioInstance = io;
};

const getIoInstance = () => {
    if (!ioInstance) {
        console.warn("Socket.io instance is not yet initialized. Returning a placeholder.");
        return {
            to: () => ({
                emit: () => console.warn("Socket.IO emit attempted before initialization."),
            }),
        };
    }
    return ioInstance;
};

module.exports = { setIoInstance, getIoInstance };
