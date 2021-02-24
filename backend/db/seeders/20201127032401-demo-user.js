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
          profileImageUrl:
            "http://isntgram.herokuapp.com/static/media/mylo-profile.70b05805.jpg",
          bannerImageUrl: "google.com",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          username: "James",
          firstName: "James",
          lastName: "Robertson",
          email: "james@twitter.com",
          bio: "I am James!",
          profileImageUrl:
            "https://slickpics.s3.us-east-2.amazonaws.com/uploads/FriJul242125202020.png",
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
