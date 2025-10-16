const ioClient = require('socket.io-client');
const { server } = require('../src/index');

const SOCKET_URL = 'http://localhost:3000';
const options = {
  transports: ['websocket'],
  path: '/socket',
  forceNew: true,
  reconnection: false,
};

let client;

beforeAll((done) => {
  // wait a moment for server to be ready
  setTimeout(done, 200);
});

afterAll((done) => {
  if (client && client.connected) client.disconnect();
  server.close(done);
});

test('socket echo message', (done) => {
  client = ioClient.connect(SOCKET_URL, options);
  client.on('connect', () => {
    client.emit('message', JSON.stringify({ type: 'echo', data: 'hello' }));
  });

  client.on('echo', (msg) => {
    try {
      expect(msg).toHaveProperty('data', 'hello');
      done();
    } catch (err) {
      done(err);
    }
  });

  client.on('connect_error', (err) => done(err));
});
