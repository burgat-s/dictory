let morgan = require('morgan');
let path = require('path')
let fs = require('fs')
const moment = require('moment-timezone');

module.exports = function ({app}) {

    morgan.token('date', (req, res, tz) => {
        return moment().tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD, HH:mm');
    });
    morgan.format('myformat', ':remote-addr - :remote-user [:date[America/Argentina/Buenos_Aires]] ":method :url" :status :res[content-length] - :response-time ms ":user-agent"');
    let accessLogStream = fs.createWriteStream(path.join(__dirname, '../../../logs/access.log'), {flags: 'a'})
    app.use(morgan('myformat', {stream: accessLogStream}));

    return app
}
