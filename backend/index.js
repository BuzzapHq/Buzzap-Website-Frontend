const config = require('./config/env');
const connectDB = require('./config/db');
const createApp = require('./app');
const logger = require('./utils/logger');

// Bootstrap: validate env (on require) -> connect DB -> start HTTP server.
async function start() {
  await connectDB();

  const app = createApp();
  const server = app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT} (${config.NODE_ENV})`);
  });

  // Graceful shutdown.
  const shutdown = (signal) => {
    logger.info(`${signal} received, shutting down...`);
    server.close(() => {
      logger.info('HTTP server closed.');
      process.exit(0);
    });
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

// Crash guards: log and exit so the process manager can restart cleanly.
process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled Rejection: ${reason instanceof Error ? reason.stack : reason}`);
  process.exit(1);
});
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.stack || err.message}`);
  process.exit(1);
});

start();
