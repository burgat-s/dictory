const morganLoader = require('../extensions/loggers/morgan');
const Router = require("../routes/router");
const Handler = require("../exceptions/handler");
const expressLoader = require('./express');

module.exports = function ({app}) {
    //nota ::  la posición de las llamadas no son intercambiables
     morganLoader({app: app});
     Router({app: app});
     Handler({app: app});
     expressLoader({app: app});
}