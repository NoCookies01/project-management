const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const {
    getReceiverSocketId,
    addUserSocket,
    removeUserSocket,
    getTotalOnlineUsers,
    userSocketMap
} = require('../helpers/socket.helper'); 
const { setIoInstance } = require('./io'); 
const config = require('../../config');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: config.FRONTEND_URL,
        methods: ["GET", "POST"],
    },
});

setIoInstance(io);

io.on("connection", (socket) => {

    const userId = socket.handshake.query.userId;
    if (userId && userId !== "undefined") {
        addUserSocket(userId, socket.id);

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    } else {
        console.error('Invalid userId:', userId);
    }

    console.log(`Total online users: ${getTotalOnlineUsers()}`);
    
    socket.on('joinProject', (projectId) => {
		socket.join(`project_${projectId}`);
        console.log(`User ${userId} joined project ${projectId}`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        if (userId) {
            removeUserSocket(userId, socket.id);
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});

module.exports = { app, server, getReceiverSocketId };