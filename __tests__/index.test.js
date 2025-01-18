const request = require('supertest');
const app = require('../src/index');

describe('API Endpoints', () => {
  test('GET / should return hello world message', async () => {
    const response = await request(app)
      .get('/')
      .expect(200);
    
    expect(response.body).toEqual({ message: 'Hello World!' });
  });
});