const request = require('supertest');
const { app, server } = require('../app'); // Import your app

test('should update user profile information', async () => {
    const response = await request(app)
        .put(`/api/accounts/update/testUser`)
        .send({
            username: 'updatedUser',
            email: 'updated@email.com'
        });
    expect(response.statusCode).toBe(200);
});

afterAll(() => {
    server.close(); // Close the server after all tests have run
});
