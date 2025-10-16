const request = require('supertest');
const { app, server, users } = require('../src/index');

afterAll((done) => {
  // close server to allow jest to exit
  server.close(done);
});

describe('HTTP endpoints', () => {
  test('GET /ping -> pong', async () => {
    const res = await request(app).get('/ping');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('pong');
  });

  test('GET /users -> array', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /users -> create user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Bob' })
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Bob');
  });

  test('DELETE /users -> delete user', async () => {
    const res = await request(app)
      .delete('/users')
      .send({ name: 'Bob' })
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
  });

  test('POST /users -> bad request when no name', async () => {
    const res = await request(app)
      .post('/users')
      .send({})
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
