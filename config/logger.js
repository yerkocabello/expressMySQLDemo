'use strict';

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, label, splat} = format;
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const LOG_PATH = process.env.LOG_PATH || '.';

const plainFormat = printf(info => {
  return `${info.timestamp} [${info.level.toUpperCase()}] - ${info.message}`;
});

let trans = [];

if(env === 'prod' || env === 'qa') {
  trans.push(new transports.File({ filename: path.join(LOG_PATH, '/yourfilename.log')}));
} else {
  trans.push(new transports.Console());
}

const logger = createLogger({
    level: 'info',
    format: combine(
        splat(),
      timestamp({
        format: 'DD-MM-YYYY HH:mm:ss.sss'
      }),
      plainFormat
    ),
    transports: trans
  });

module.exports = logger;