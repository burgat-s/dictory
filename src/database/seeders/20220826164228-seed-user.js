'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('users', [{
            username: 'SnoopDog',
            password: '123456789',
            email: 'SnoopDog@gmail.com',
            name: 'Dog',
            last_name: 'Snoop',
            dni: '33444555',
            cell_phone: '1112223333',
            active: '1',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        }, {
          username: 'SnoopDog1',
          password: '123456789',
          email: 'SnoopDog1@gmail.com',
          name: 'Dog1',
          last_name: 'Snoop1',
          dni: '33444555',
          cell_phone: '1112223333',
          active: '1',
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString()
        }], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete('users', null, {});
    }
};
