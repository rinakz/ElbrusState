'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Days', [
      { day: 'понедельник' },
      { day: 'вторник' },
      { day: 'среда' },
      { day: 'четверг' },
      { day: 'пятница' },

  ], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Days', null, {});
  }
};
