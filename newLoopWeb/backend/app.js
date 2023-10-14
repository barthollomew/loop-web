// Import Fastify and plugins
const fastify = require('fastify')({ logger: true });
const fastifyCors = require('fastify-cors');

// Routers
const accountsRouter = require('./routes/accounts');
const moviesRouter = require('./routes/movies');
const reviewsRouter = require('./routes/reviews');
const showtimesRouter = require('./routes/showtimes');

// Middlewares
fastify.register(fastifyCors); // This plugin adds a simple cors() utility

// Routes
fastify.register(accountsRouter, { prefix: '/api/accounts' });
fastify.register(moviesRouter, { prefix: '/api/movies' });
fastify.register(reviewsRouter, { prefix: '/api/reviews' });
fastify.register(showtimesRouter, { prefix: '/api/showtimes' });

// Server
const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3001);
    fastify.log.info(`Server running on port ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Check if file is being required or run directly
if (require.main === module) {
    start();
  } else {
    module.exports = { build: fastify };
  }
  