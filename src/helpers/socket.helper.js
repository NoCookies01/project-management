const { redisClient } = require("../config/redis.config");

const userSocketMapKey = "userSocketMap";

async function addUserSocket(userId, socketId) {
    await redisClient.hSet(userSocketMapKey, userId, socketId);
}

async function removeUserSocket(userId) {
    await redisClient.hDel(userSocketMapKey, userId);
}

async function getReceiverSocketId(userId) {
    return await redisClient.hGet(userSocketMapKey, userId);
}

async function getTotalOnlineUsers() {
    const keys = await redisClient.hKeys(userSocketMapKey);
    return keys.length;
}

module.exports = {
    addUserSocket,
    removeUserSocket,
    getReceiverSocketId,
    getTotalOnlineUsers,
};
