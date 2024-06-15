// socketServer.ts

import http from 'http';
import { createSocketInstance } from './sockeInstance';

export function startSocketServer() {
    const server = http.createServer();
    
    const io = createSocketInstance(server);

    io.on('connection', (socket) => {
        console.log('User connected to Socket.IO');

        socket.on('disconnect', () => {
            console.log('User disconnected from Socket.IO');
        });

        // Add other event listeners as needed
    });

    server.listen(5000, () => {
        console.log('Socket.IO server running on port 5000');
    });
}
