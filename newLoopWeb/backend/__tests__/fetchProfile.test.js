const request = require('supertest');
const app = require('../app');

test('should fetch the correct user profile information', async () => {
    const response = await request(app)
        .get('/api/accounts/profile/testUser') // Use your actual profile endpoint
        .send();
    expect(response.statusCode).toBe(200);
    // Additional assertions...
});
