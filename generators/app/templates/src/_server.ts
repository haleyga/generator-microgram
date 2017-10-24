/**
 * Module dependencies.
 */
import * as bodyParser from 'body-parser';
import * as compression from 'compression';  // compresses requests
import * as connectRedis from 'connect-redis';
import * as dotenv from 'dotenv';
import * as errorHandler from 'errorhandler';
import * as express from 'express';
import * as session from 'express-session';
import * as expressValidator from 'express-validator';
import * as fs from 'fs';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as path from 'path';

const REDIS_STORE = connectRedis(session);

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env.example' });

/**
 * Import ontrollers (route handlers).
 */
import { defaultRouter } from './controllers/default';
import { healthRouter } from './controllers/health';
import { metaRouter } from './controllers/meta';
import { pingRouter } from './controllers/ping';

/**
 * API keys and Passport configuration.
 */
//import * as passportConfig from './config/passport';


/**
 * Create Express server.
 */
const app = express();


/**
 * Connect to MongoDB.
 */
const mongoDefaultConnectionString = 'mongodb://localhost:27017';
const mongoConnectionString = process.env.MONGODB_URI || mongoDefaultConnectionString;
mongoose.connect(mongoConnectionString);

mongoose.connection.on('error', () => {
    console.log('MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});

/**
 * Express configuration.
 */
const defaultPort: number = 3000;
app.set('port', process.env.PORT || defaultPort);
app.use(compression());

app.use(morgan('dev'));
app.use(morgan('common', { stream: fs.createWriteStream(path.join('logs', 'access.log'), { flags: 'a' }) }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
                    resave           : true,
                    saveUninitialized: true,
                    secret           : process.env.SESSION_SECRET,
                    store            : new REDIS_STORE({

                                                       }),
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
app.use('/', defaultRouter);
app.use('/ping', pingRouter);
app.use('/health', healthRouter);
app.use('/meta', metaRouter);

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());


/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
