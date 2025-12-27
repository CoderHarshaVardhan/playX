// src/socket/socketManager.js

import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000", 
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(`[Socket.IO] User connected: ${socket.id}`);

        socket.on('joinSlotRoom', (slotId) => {
            socket.join(slotId);
            // console.log(`User ${socket.id} joined slot room: ${slotId}`);
        });

        socket.on('leaveSlotRoom', (slotId) => {
            socket.leave(slotId);
        });

        socket.on('disconnect', () => {
            // console.log(`User disconnected: ${socket.id}`);
        });
    });
    
    return io;
};

// Export the io instance to be used for emitting events from Express controllers
export { io };