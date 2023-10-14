const request = require('supertest');
const { app, server } = require('../app'); 

test('should fetch the correct user profile information', async () => {
    const response = await request(app)
        .get('/api/accounts/profile/testUser') 
        .send();
    expect(response.statusCode).toBe(200);
});

afterAll(() => {
    server.close(); // Close the server after all tests have run
});
