'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Roles', [
      { role: 'admin' },
      { role: 'student' },

  ], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Roles', null, {});
  }
};
