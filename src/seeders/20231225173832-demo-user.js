'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'cong0212@gmail.com',
      password: '123456',
      firstName: 'cong',
      lastName: 'tran',
      address: 'nam dinh',
      phonenumber:'0123456789',
      gender: 1,
      image:'',
      roleID: 'ROLE',
      positionID:'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
