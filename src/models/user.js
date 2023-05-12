'use strict';
const { db } = require("../database/connection");
const { DataTypes } = require("sequelize");


const User = db.define('users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  last_name: { type: DataTypes.STRING },
  dni: { type: DataTypes.STRING },
  cell_phone: { type: DataTypes.STRING },
  active: { type: DataTypes.INTEGER },
},{
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: true,
  // define the table's name
  tableName: 'users'
})

//User.belongsTo(Roles, { foreignKey: 'roleId' });
//Roles.hasMany(User, { foreignKey: 'roleId' })


module.exports = User;
