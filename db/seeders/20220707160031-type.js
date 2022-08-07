'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Types', [
      { type: 'stand-up'},
      { type: 'лекция'},
      { type: 'покушать'},
      { type: 'поиграть в теннис'},
      { type: 'поиграть в кикер'},
      { type: 'йога'},
      { type: 'поспать'},
      { type: 'групповой проект'},
      { type: 'самоподготовка'},
      { type: 'код-ревью'},
      { type: 'собеседование'},
      { type: 'встреча с выпускником'},
      { type: 'день открытых дверей'},
      { type: 'настольные игры'},
      { type: 'другое'},
  ], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Types', null, {});
  }
};
