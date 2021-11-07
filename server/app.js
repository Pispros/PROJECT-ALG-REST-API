/**
 * Main application file
 */

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';

import expressConfig from './config/express';
import registerRoutes from './routes';
import seedDatabaseIfNeeded from './config/seed';


// Connect to MongoDB
const mongooseConnectionPromise = mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1); // eslint-disable-line no-process-exit
});

// Setup server
var app = express();
var server = http.createServer(app);

expressConfig(app);
registerRoutes(app);

// Start server
function startServer() {
    app.angularFullstack = server.listen(config.port, config.ip, function() {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
}


setImmediate(startServer);

// Expose app
exports = module.exports = app;
