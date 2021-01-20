const winston = require('winston');
const path = require('path');

const logConfiguration = {
  level: 'info',
  'transports': [
    new winston.transports.File({
      filename: path.join(appRoot, 'log', new Date().toISOString().slice(0, 10) + '-error.log'), level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(appRoot, 'log', new Date().toISOString().slice(0, 10) + '-combined.log')
    })
  ]
};

const logger = winston.createLogger(logConfiguration);


module.exports = { logger };