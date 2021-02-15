"use strict";
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define(
    "Follow",
    {
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
      userFollowedId: {
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
    },
    {}
  );
  Follow.associate = function (models) {
    // associations can be defined here
    Follow.belongsTo(models.User, { foreignKey: "userId", as: "follower" });
    Follow.belongsTo(models.User, {
      foreignKey: "userFollowedId",
      as: "followed",
    });
  };
  return Follow;
};
