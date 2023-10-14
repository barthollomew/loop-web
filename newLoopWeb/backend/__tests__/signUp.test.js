const request = require('supertest');
const app = require('../app'); // Import your app

test('should create a new user account upon sign-up', async () => {
    const response = await request(app)
        .post('/api/accounts/signup') // Use your actual sign-up endpoint
        .send({
            username: 'testUser',
            password: 'testPassword',
            email: 'test@email.com'
        });
    expect(response.statusCode).toBe(201);
    // Additional assertions...
});
