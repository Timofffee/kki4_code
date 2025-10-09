// server.ts
/**
 * Minimal TypeScript Node.js server with Socket.IO
 * - Accepts connections and sends a simple welcome message.
 * - TODO: implement authoritative game state, broadcast, validation.
 */

import express from 'express';
import { createServer } from 'http';
import { Server as IOServer } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new IOServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.get('/', (req, res) => {
  res.send('Agar-like minimal server. Students should implement game logic.');
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  // send a tiny welcome packet
  socket.emit('welcome', { msg: 'Hello from server', id: socket.id });

  // Simple example handlers (left intentionally minimal)
  socket.on('disconnect', (reason) => {
    console.log('Client disconnected', socket.id, 'reason=', reason);
  });

  // TODO: handle 'player:spawn', 'player:update', 'chat', etc.
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
