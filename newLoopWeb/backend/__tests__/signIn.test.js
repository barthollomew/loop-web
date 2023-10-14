const request = require('supertest');
const app = require('../app');

test('should allow a user to sign in with correct credentials', async () => {
    const response = await request(app)
        .post('/api/accounts/signin') // Use your actual sign-in endpoint
        .send({
            username: 'testUser',
            password: 'testPassword'
        });
    expect(response.statusCode).toBe(200);
    // Additional assertions...
});
