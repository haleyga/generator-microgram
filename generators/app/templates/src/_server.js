"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
var bodyParser = require("body-parser");
var compression = require("compression"); // compresses requests
var connectRedis = require("connect-redis");
var dotenv = require("dotenv");
var errorHandler = require("errorhandler");
var express = require("express");
var session = require("express-session");
var expressValidator = require("express-validator");
var fs = require("fs");
var mongoose = require("mongoose");
var morgan = require("morgan");
var path = require("path");
var REDIS_STORE = connectRedis(session);
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env.example' });
/**
 * Import ontrollers (route handlers).
 */
var default_1 = require("./controllers/default");
var health_1 = require("./controllers/health");
var meta_1 = require("./controllers/meta");
var ping_1 = require("./controllers/ping");
/**
 * API keys and Passport configuration.
 */
//import * as passportConfig from './config/passport';
/**
 * Create Express server.
 */
var app = express();
/**
 * Connect to MongoDB.
 */
var mongoDefaultConnectionString = 'mongodb://localhost:27017';
var mongoConnectionString = process.env.MONGODB_URI || mongoDefaultConnectionString;
mongoose.connect(mongoConnectionString);
mongoose.connection.on('error', function () {
    console.log('MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});
/**
 * Express configuration.
 */
var defaultPort = 3000;
app.set('port', process.env.PORT || defaultPort);
app.use(compression());
app.use(morgan('dev'));
app.use(morgan('common', { stream: fs.createWriteStream(path.join('logs', 'access.log'), { flags: 'a' }) }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new REDIS_STORE({}),
}));
//app.use(passport.initialize());
//app.use(passport.session());
//app.use((req, res, next) => {
//    res.locals.user = req.user;
//    next();
//});
//app.use((req, res, next) => {
//     After successful login, redirect back to the intended page
//    if (!req.user &&
//        req.path !== "/login" &&
//        req.path !== "/signup" &&
//        !req.path.match(/^\/auth/) &&
//        !req.path.match(/\./)) {
//        req.session.returnTo = req.path;
//    } else if (req.user &&
//               req.path == "/account") {
//        req.session.returnTo = req.path;
//    }
//    next();
//});
/**
 * Add routers
 */
app.use('/', default_1.defaultRouter);
app.use('/ping', ping_1.pingRouter);
app.use('/health', health_1.healthRouter);
app.use('/meta', meta_1.metaRouter);
/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());
/**
 * Start Express server.
 */
app.listen(app.get('port'), function () {
    console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
module.exports = app;
