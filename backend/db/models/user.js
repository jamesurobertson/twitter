"use strict";
const e = require("express");
const { Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [2, 256],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [2, 256],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 256],
        },
      },
      profileImageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bannerImageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 256],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );

  User.prototype.toSafeObject = function () {
    const {
      id,
      username,
      email,
      firstName,
      lastName,
      bio,
      website,
      profileImageUrl,
      bannerImageUrl,
    } = this;
    return {
      id,
      username,
      email,
      firstName,
      lastName,
      bio,
      website,
      profileImageUrl,
      bannerImageUrl,
    };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope("currentUser").findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require("sequelize");
    const user = await User.scope("loginUser").findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope("currentUser").findByPk(user.id);
    }
  };

  User.signup = async function ({
    username,
    email,
    password,
    profileImageUrl,
    bannerImageUrl,
  }) {
    // TODO UPDATE CREATE AND IMPORTS
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
      profileImageUrl,
      bannerImageUrl,
    });
    return await User.scope("currentUser").findByPk(user.id);
  };
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Conversation, {
      through: models.UserConversation,
      // might not need bottom 2, testing out.
      otherKey: "conversationId",
      foreignKey: "userId",
    });
    User.hasMany(models.Tweet, { foreignKey: "userId" });
    User.hasMany(models.Follow, { foreignKey: "userId" });
    User.hasMany(models.Bookmark, { foreignKey: "userId" });
    User.hasMany(models.Message, { foreignKey: "userId" });
    User.hasMany(models.Like, { foreignKey: "userId" });
  };
  return User;
};
