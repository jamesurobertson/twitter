"use strict";
module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define(
    "Bookmark",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
        },
      },
      tweetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Tweets",
        },
      },
    },
    {}
  );
  Bookmark.associate = function (models) {
    // associations can be defined here
    Bookmark.belongsTo(models.Tweet, { foreignKey: "tweetId" });
    Bookmark.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Bookmark;
};
