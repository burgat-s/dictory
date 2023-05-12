const { createLogger, format, transports } = require('src/extensions/loggers/winston');

module.exports = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.colorize(),
        format.printf(info => `[${info.timestamp}] [ ${info.level} ] - ${info.message}`)
        ),
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename: `${__dirname}/../logs/logger_api.log`
        }),
        new transports.Console({
            level: 'debug',
            colorize: true,
            format: format.combine(format.simple())
        })
    ]
})

