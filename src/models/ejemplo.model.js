/*

* Codigo conservado para tomar de ejemplo en la creacion de nuevos modelos
* usar con precaucion es derivado de un ejemplo de TS

const { DataTypes } = require("sequelize");
const { db } = require("../database/connection");
const Empleado = require("./empleado.model");

const Candidato = db.define('Candidato', {
    evenro: {
        type: DataTypes.INTEGER,
    },
    ternro: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    conf: {
        type: DataTypes.INTEGER,
        defaultValue: -1
    },
    recdip: {
        type: DataTypes.INTEGER,
        defaultValue: -1
    },
    orden: {
        type: DataTypes.INTEGER,
        defaultValue: -1
    },
    confpart: {
        type: DataTypes.SMALLINT,
    },
    invitado: {
        type: DataTypes.SMALLINT,
        defaultValue: -1
    },
    invext: {
        type: DataTypes.INTEGER,
        defaultValue: -1
    },
    ess: {
        type: DataTypes.INTEGER,
        defaultValue: -1
    },
    cancanths: {
        type: DataTypes.DECIMAL(19, 4)
    },
    canfecini: {
        type: DataTypes.DATE
    },
    canfecfin: {
        type: DataTypes.DATE
    },
}, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // define the table's name
    tableName: 'cap_candidato'
})

Candidato.removeAttribute('id');

Candidato.belongsTo(Empleado, {foreignKey: 'ternro'});
Empleado.hasMany(Candidato, { foreignKey: 'ternro' });
y
export default Candidato;
*/
