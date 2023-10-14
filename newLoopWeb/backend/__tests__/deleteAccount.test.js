const request = require('supertest');
const { app, server } = require('../app');

test('should allow a user account to be deleted', async () => {
    const response = await request(app)
        .delete('/api/accounts/1') 
        .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Account deleted!');
});

afterAll(() => {
    server.close(); 
});
