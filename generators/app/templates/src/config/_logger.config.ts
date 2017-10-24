const winston    = require('winston');
winston.emitErrs = true;

//tslint:disable

export const logger = new winston.Logger({
                                             exceptionHandlers: [
                                                 new winston.transports.File({ filename: 'logs/exception.log' }),
                                             ],
                                             exitOnError      : false,
                                             transports       : [
                                                 new winston.transports.File({
                                                                                 colorize        : false,
                                                                                 filename        : 'logs/info.log',
                                                                                 handleExceptions: false,
                                                                                 json            : true,
                                                                                 level           : 'info',
                                                                                 maxFiles        : 5,
                                                                                 maxsize         : 5242880, //5MB
                                                                                 name: 'infolog',
                                                                             }),
                                                 new winston.transports.File({
                                                                                 colorize        : false,
                                                                                 filename        : 'logs/error.log',
                                                                                 handleExceptions: false,
                                                                                 json            : true,
                                                                                 level           : 'error',
                                                                                 maxFiles        : 5,
                                                                                 maxsize         : 5242880, //5MB
                                                                                 name: 'errorlog',
                                                                             }),
                                             ],
                                         });
