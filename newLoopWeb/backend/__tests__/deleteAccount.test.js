const request = require('supertest');
const app = require('../app');

test('should allow a user account to be deleted', async () => {
    const response = await request(app)
        .delete('/api/accounts/1') // Assuming an endpoint and user ID for demonstration
        .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Account deleted!');
    // Additional assertions...
});
