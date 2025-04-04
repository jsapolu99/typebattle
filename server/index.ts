import { createServer } from 'http';
import { Server } from 'socket.io';
import { setupListeners } from "./setupListeners";

const PORT = process.env.PORT || 8080;

// Create an HTTP server that responds to requests
const httpServer = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Socket.IO server is running\n');
});

const io = new Server(httpServer, {
  cors: {
    origin: process.env.ORIGIN || '*',
    methods: ['GET', 'POST'],
  }
});

setupListeners(io);

// Correct the listen function (remove Number('0.0.0.0'))
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
