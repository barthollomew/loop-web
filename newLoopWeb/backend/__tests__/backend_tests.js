const request = require('supertest');
const app = require('../app');  // Ensure app.js exports the app object

// Test 1: SignUp API - Ensure a user can sign up
test('Should signup a new user', async () => {
    const newUser = {
        username: 'testuser',
        password: 'testpass',
        email: 'test@example.com', // Add an email field if required
    };

    await request(app)
        .post('/api/accounts/signup')
        .send(newUser)
        .expect(201);  // Expected to return HTTP 201 Created
});


// Test 2: SignIn API - Ensure a user can sign in with valid credentials
test('Should login existing user', async () => {
    await request(app)
        .post('/api/accounts/signin')
        .send({
            username: 'testuser',
            password: 'testpass'
        })
        .expect(200);  // Expected to return HTTP 200 OK
});
// Test 3: Profile API - Ensure fetching profile data of authenticated user
test('Should fetch profile data for an authenticated user', async () => {
    // Use a valid token obtained from the signin process
    const token = "YOUR_VALID_AUTH_TOKEN_HERE";

    await request(app)
        .get('/api/accounts/profile')
        .set('Authorization', 'Bearer ' + token)
        .expect(200);  // Expected to return HTTP 200 OK
});
