"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "DemoUser",
          firstName: "Demo",
          lastName: "User",
          email: "demo@twitter.com",
          bio: "I am the demo user!",
          profileImageUrl: "google.com",
          bannerImageUrl: "google.com",
          hashedPassword: bcrypt.hashSync("password"),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["DemoUser", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
