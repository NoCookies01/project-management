const userSocketMap = {};

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId] || [];
};

const addUserSocket = (userId, socketId) => {
    if (!userSocketMap[userId]) {
        userSocketMap[userId] = [];
    }
    userSocketMap[userId].push(socketId);
};

const removeUserSocket = (userId, socketId) => {
    if (userSocketMap[userId]) {
        userSocketMap[userId] = userSocketMap[userId].filter(id => id !== socketId);
        if (userSocketMap[userId].length === 0) {
            delete userSocketMap[userId];
        }
    }
};

const getTotalOnlineUsers = () => {
    return Object.keys(userSocketMap).length;
};

module.exports = {
    getReceiverSocketId,
    addUserSocket,
    removeUserSocket,
    getTotalOnlineUsers,
    userSocketMap
};
