const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      { name: 'Admin', email: 'admin@elb.ru', password: await bcrypt.hash('123', 10), role_id: 1 },
      { name: 'Anton Alekseevich', email: 'ant@elb.ru', password: await bcrypt.hash('123', 10), role_id: 1},
      { name: 'Adam Balkoev', email: 'adam@elb.ru', password: await bcrypt.hash('123', 10), role_id: 1},
      { name: 'Artem Oganesyan', email: 'artem@elb.ru', password: await bcrypt.hash('123', 10), role_id: 1},
      { name: 'Kirill Kukuliev', email: 'kirill@elb.ru', password: await bcrypt.hash('123', 10), role_id: 1},
      { name: 'Julia Tarasova', email: 'julia@elb.ru', password: await bcrypt.hash('123', 10), role_id: 1},
      { name: 'Nikita Artamonov', email: 'nikita@elb.ru', password: await bcrypt.hash('123', 10), role_id: 2},
      { name: 'Alexandr Knyazev', email: 'alex@elb.ru', password: await bcrypt.hash('123', 10), role_id: 1},
      { name: 'Vlad Rudnitsky', email: 'vladru@elb.ru', password: await bcrypt.hash('123', 10), role_id: 2},

  ], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});
  }
};
