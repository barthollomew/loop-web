const request = require('supertest');
const { app, server } = require('../app'); // Import your app

test('should create a new user account upon sign-up', async () => {
    const response = await request(app)
        .post(`/api/accounts/signup`) 
        .send({
            username: 'testUser',
            password: 'testPassword',
            email: 'test@email.com'
        });
    expect(response.statusCode).toBe(201);
});

afterAll(() => {
    server.close(); // Close the server after all tests have run
});
