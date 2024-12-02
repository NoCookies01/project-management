const { createClient } = require("redis");

const redisClient = createClient({ url: "redis://localhost:6379" });
const subClient = redisClient.duplicate();

module.exports = {
    redisClient,
    subClient
}