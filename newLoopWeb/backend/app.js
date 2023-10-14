const fastify = require('fastify');
const fastifyCors = require('fastify-cors');

const build = () => {
  const app = fastify({ logger: true });

  // Middlewares
  app.register(fastifyCors);

  // Routes
  app.register(require('./routes/accounts'), { prefix: '/api/accounts' });
  app.register(require('./routes/movies'), { prefix: '/api/movies' });
  app.register(require('./routes/reviews'), { prefix: '/api/reviews' });
  app.register(require('./routes/showtimes'), { prefix: '/api/showtimes' });

  return app;
};

// Server
const start = async () => {
  const app = build();
  try {
    await app.listen(process.env.PORT || 3001);
    app.log.info(`Server running on port ${app.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

// Check if file is being required or run directly
if (require.main === module) {
  // Run the server!
  start();
} else {
  // Export for testing
  module.exports = { build };
}
