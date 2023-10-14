const request = require('supertest');
const { app, server } = require('../app');

test('should allow a user to sign in with correct credentials', async () => {
    const response = await request(app)
        .post(`/api/accounts/signin`)
        .send({
            username: 'testUser',
            password: 'testPassword'
        });
    expect(response.statusCode).toBe(200);
});

afterAll(() => {
    server.close(); // Close the server after all tests have run
});
