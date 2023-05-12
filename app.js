const express = require('express');
const loaders = require('./src/loaders');

async function startServer() {

    let app = express();
    loaders({app: app});

    app.listen(process.env.PORT, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Your server is ready !`);
    });

    module.exports = app;
}

startServer();