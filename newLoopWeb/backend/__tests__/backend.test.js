const tap = require('tap');
const { build } = require('../app');  

tap.test('Successfully create an account', async (t) => {
    const fastify = build();
    t.teardown(() => fastify.close());

    const response = await fastify.inject({
        method: 'POST',
        url: '/api/accounts/signup',
        payload: {
            username: 'TestUser',
            password: 'SecureP@ssw0rd',
            email: 'testuser@example.com'
        }
    });

    t.equal(response.statusCode, 201);
    t.equal(response.json().message, 'Account created!');
});

tap.test('Fail to create an account with an existing username', async (t) => {
    const fastify = build();
    t.teardown(() => fastify.close());

    // Ensuring the user exists
    await fastify.inject({
        method: 'POST',
        url: '/api/accounts/signup',
        payload: {
            username: 'ExistingUser',
            password: 'SecureP@ssw0rd',
            email: 'existinguser@example.com'
        }
    });

    const response = await fastify.inject({
        method: 'POST',
        url: '/api/accounts/signup',
        payload: {
            username: 'ExistingUser',
            password: 'SecureP@ssw0rd',
            email: 'newuser@example.com'
        }
    });

    t.equal(response.statusCode, 500);
    t.match(response.json().message, /Error creating account/);
});

tap.test('Successfully sign in to an account', async (t) => {
    const fastify = build();
    t.teardown(() => fastify.close());

    // Ensure that the user exists
    await fastify.inject({
        method: 'POST',
        url: '/api/accounts/signup',
        payload: {
            username: 'TestUser',
            password: 'SecureP@ssw0rd',
            email: 'testuser@example.com'
        }
    });

    const response = await fastify.inject({
        method: 'POST',
        url: '/api/accounts/signin',
        payload: {
            username: 'TestUser',
            password: 'SecureP@ssw0rd'
        }
    });

    t.equal(response.statusCode, 200);
    t.equal(response.json().message, 'Sign in successful');
});

tap.test('Fail to sign in with incorrect password', async (t) => {
    const fastify = build();
    t.teardown(() => fastify.close());

    // Ensure that the user exists
    await fastify.inject({
        method: 'POST',
        url: '/api/accounts/signup',
        payload: {
            username: 'TestUser',
            password: 'SecureP@ssw0rd',
            email: 'testuser@example.com'
        }
    });

    const response = await fastify.inject({
        method: 'POST',
        url: '/api/accounts/signin',
        payload: {
            username: 'TestUser',
            password: 'WrongP@ssw0rd'
        }
    });

    t.equal(response.statusCode, 401);
    t.equal(response.json().message, 'Invalid credentials');
});

tap.test('Successfully update account details', async (t) => {
    const fastify = build();
    t.teardown(() => fastify.close());

    // Assume userId = 1 for the test user. This should be adjusted as per your DB.
    const response = await fastify.inject({
        method: 'PUT',
        url: '/api/accounts/update/1',
        payload: {
            username: 'UpdatedUser',
            password: 'NewP@ssw0rd',
            email: 'updateduser@example.com'
        }
    });

    t.equal(response.statusCode, 200);
    t.equal(response.json().message, 'Account updated!');
});
