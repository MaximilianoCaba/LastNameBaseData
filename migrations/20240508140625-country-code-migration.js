const {countryConstList} = require("../src/consts/CountryConst");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const countriesToInsert = countryConstList.map(country => ({
      id: country.id,
      country_code: country.countryCode,
      country_name: country.countryName
    }));
    return queryInterface.bulkInsert('country_code', countriesToInsert, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('country_code', null, {});
  }
};
