const request = require('supertest');
const app = require('../src/index');

describe('User API Endpoints', () => {
  let createdUser;

  test('POST /users should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    const response = await request(app)
      .post('/users')
      .send(userData)
      .expect(201);

    expect(response.body).toMatchObject({
      id: 1,
      ...userData
    });

    createdUser = response.body;
  });

  test('GET /users should return all users', async () => {
    const response = await request(app)
      .get('/users')
      .expect(200);

    expect(response.body).toEqual([createdUser]);
  });

  test('GET /users/:id should return a single user', async () => {
    const response = await request(app)
      .get(`/users/${createdUser.id}`)
      .expect(200);

    expect(response.body).toEqual(createdUser);
  });

  test('GET /users/:id should return 404 for non-existent user', async () => {
    await request(app)
      .get('/users/999')
      .expect(404);
  });
});