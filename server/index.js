/* eslint consistent-return:0 import/order:0 */
// eslint-disable-next-line no-global-assign
Promise = require('bluebird');

const app = require('./app');
const config = require('./config/config');
const database = require('./database');
const logger = require('./config/logger');
require('./scheduler');

const setup = require('./middlewares/frontendMiddleware');
const { resolve } = require('path');

let server;
database.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  database.setupDefaults().then(() => {
    logger.info('Starting server');
    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = error => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

