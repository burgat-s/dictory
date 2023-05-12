'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true, unique: true
            }, username: {
                type: Sequelize.STRING, allowNull: false, unique: true
            }, password: {
                type: Sequelize.STRING, allowNull: false
            }, email: {
                type: Sequelize.STRING, allowNull: false, unique: true
            }, name: {
                type: Sequelize.STRING
            }, last_name: {
               type: Sequelize.STRING
            }, dni: {
                type: Sequelize.STRING
            }, cell_phone: {
                type: Sequelize.STRING
            }, active: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        },{})
    }, async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    }
};

