const indexRouter = require('../routes/indexRoutes');
const usersRouter = require('../routes/usersRoutes');

module.exports = function ({ app })  {
        let base_route = "/api/v1"
        app.use( base_route + '/', indexRouter);
        app.use( base_route + '/users', usersRouter);
        return app;
}