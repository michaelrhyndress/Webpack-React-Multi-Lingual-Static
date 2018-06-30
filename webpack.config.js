if (process.env.npm_lifecycle_event === 'start:dev') {
	module.exports = require('./config/webpack.dev.js');
} else {
	module.exports = require('./config/webpack.prod.js');
}