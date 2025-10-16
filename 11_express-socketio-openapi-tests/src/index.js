const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  path: '/socket',
  // cors: { origin: '*' } // enable if needed
});

// In-memory users store
const users = [{ id: 1, name: 'Alice' }];

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *       required:
 *         - id
 *         - name
 */

/**
 * @openapi
 * /ping:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: pong
 */
app.get('/ping', (req, res) => {
  res.send('pong');
});

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get users
 *     responses:
 *       200:
 *         description: Array of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created user
 */
app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const id = users.length ? users[users.length - 1].id + 1 : 1;
  const user = { id, name };
  users.push(user);
  // also broadcast to sockets
  io.emit('user:created', user);
  res.status(201).json(user);
});

app.delete('/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  res.status(200).json({id: -1});
});

// Swagger / OpenAPI setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Example API',
    version: '1.0.0',
    description: 'Express + Socket.IO example with OpenAPI generated from JSDoc'
  },
  servers: [{ url: 'http://localhost:3000' }],
};

const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: [__filename], // use this file
};

const specs = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/openapi.json', (req, res) => res.json(specs));

// Socket.IO handlers
io.on('connection', (socket) => {
  console.log('client connected', socket.id);

  socket.on('message', (msg) => {
    // generic message event (string or json)
    try {
      const parsed = typeof msg === 'string' ? JSON.parse(msg) : msg;
      if (parsed && parsed.type === 'echo') {
        socket.emit('echo', { data: parsed.data });
      } else {
        socket.emit('message', { ok: true, received: parsed });
      }
    } catch (err) {
      socket.emit('error', { error: 'invalid json' });
    }
  });

  socket.on('disconnect', (reason) => {
    console.log('client disconnected', socket.id, reason);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/docs`);
  console.log(`OpenAPI JSON: http://localhost:${PORT}/openapi.json`);
});

module.exports = { app, server, io, users };
