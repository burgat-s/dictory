const dotenv = require('dotenv');
dotenv.config();
//let { Options } = require("sequelize/types");

const config = {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "mysql"
}

module.exports = config