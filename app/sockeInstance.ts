// socketInstance.ts

import { Server as SocketIOServer, ServerOptions } from 'socket.io';
import http from 'http';

let ioInstance: SocketIOServer | null = null;

export function createSocketInstance(server: http.Server) {
    ioInstance = new SocketIOServer(server, {
        cors: {
            origin: '*', // Allow connections from any origin (for development)
        },
    } as ServerOptions);

    return ioInstance;
}

export function getSocketInstance() {
    if (!ioInstance) {
        throw new Error('Socket.IO instance not initialized');
    }
    return ioInstance;
}
