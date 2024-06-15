import express from 'express';
import next from 'next';
import { createServer } from 'http';
import { Server as SocketIOServer, Socket as ServerSocket } from 'socket.io';
import cors from 'cors';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const expressApp = express();
const httpServer = createServer(expressApp);
const io = new SocketIOServer(httpServer);

io.on('connection', (socket: ServerSocket) => {
  console.log('Client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Function to trigger frontend action (replace with your actual logic)
function triggerFrontendAction(messageData: any) {
  console.log('Placeholder: Frontend action triggered with message:', messageData);
  io.emit('paymentend', messageData);
}

expressApp.post('/api/paymentend', (req, res) => {
  const messageData = req.body;
  triggerFrontendAction(messageData);
  res.json({ message: 'Action triggered successfully' });
});

expressApp.use(cors({ origin: ['*'] }));

app.prepare().then(() => {
  expressApp.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});