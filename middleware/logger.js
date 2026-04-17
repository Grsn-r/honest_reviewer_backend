import winston from 'winston';
import expressWinston from 'express-winston';

const errorLogger = expressWinston.logger({
    transports: [
        new winston.transports.File({filename: 'errorLog'}),
    ],
    format: winston.format.json(),
});

const reqLogger = expressWinston.logger({
    transports: [
        new winston.transports.File({filename: 'reqLogger'}),
    ],
    format: winston.format.json(),
});

export {errorLogger, reqLogger};