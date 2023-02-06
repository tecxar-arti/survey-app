const argv = require('./config/argv');

module.exports = parseInt(argv.port || process.env.PORT || '3000', 10);
