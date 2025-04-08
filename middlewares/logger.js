const morgan = require('morgan');
const winston = require('winston');

// Create a Winston logger instance
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
    ),
    transports: [
        new winston.transports.Console(), // Log to the console
        new winston.transports.File({ filename: 'app.log' }) // Log to a file
    ]
});

// Stream Morgan logs through Winston
const morganMiddleware = morgan('combined', {
    stream: { write: message => logger.info(message.trim()) }
});

module.exports = { logger, morganMiddleware };
