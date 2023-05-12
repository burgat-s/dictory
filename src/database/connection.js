const { Sequelize } =  require("sequelize");
let config ;
let env = process.env.NODE_ENV

switch (process.env.DB_MOTOR || "SQLITE") {
    case "MYSQL":
         config  = require("../config/database/mysql/config.json")[env];
        break;
    case "SQLITE":
         config  = require("../config/database/sqlite/config.json")[env];
        break;
}

const db = new Sequelize(config);

const createConnection = async function (){
  try {
    await db.authenticate();
    console.log("Database online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la DB ver logs");
  }
};

module.exports = {
  db,
  createConnection
}


