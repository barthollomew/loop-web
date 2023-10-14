const { Account } = require('../models');

async function routes(fastify, options) {

  fastify.get('/', async (request, reply) => {
    try {
      const accounts = await Account.findAll();
      reply.status(200).send(accounts);
    } catch (err) {
      reply.status(500).send({ message: 'Error retrieving accounts', error: err });
    }
  });

  fastify.post('/signup', async (request, reply) => {
    try {
      const { username, password, email } = request.body;
      const newAccount = await Account.create({ username, password, email });
      reply.status(201).send({ message: 'Account created!', user: newAccount });
    } catch (err) {
      reply.status(500).send({ message: 'Error creating account', error: err.message });
    }
  });

  fastify.post('/signin', async (request, reply) => {
    try {
      const { username, password } = request.body;
      const account = await Account.findOne({ where: { username } });
      if (!account || account.password !== password) {
        return reply.status(401).send({ message: 'Invalid credentials' });
      }
      reply.status(200).send({ message: 'Sign in successful', user: account });
    } catch (err) {
      reply.status(500).send({ message: 'Error signing in', error: err.message });
    }
  });

  fastify.put('/update/:userId', async (request, reply) => {
    try {
      const { userId } = request.params;
      const { username, password, email } = request.body;

      const account = await Account.findOne({ where: { id: userId } });
      if (!account) {
        return reply.status(404).send({ message: 'User not found' });
      }

      await account.update({
        username: username || account.username,
        password: password || account.password,
        email: email || account.email,
      });

      reply.status(200).send({ message: 'Account updated!', user: account });
    } catch (err) {
      reply.status(500).send({ message: 'Error updating account', error: err.message });
    }
  });

  fastify.delete('/delete/:username', async (request, reply) => {
    try {
      const { username } = request.params;

      const account = await Account.findOne({ where: { username } });
      if (!account) {
        return reply.status(404).send({ message: 'User not found' });
      }

      await account.destroy();

      reply.status(200).send({ message: 'Account deleted!' });
    } catch (err) {
      reply.status(500).send({ message: 'Error deleting account', error: err.message });
    }
  });
}

module.exports = routes;
