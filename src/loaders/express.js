const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = function ({app}) {

    app.use(cors());
    app.use(express.json())
    app.use(function (req, res, next) {
        next(createError(404));
    });
    app.use(bodyParser.urlencoded({extended: false}));

    return app;
}