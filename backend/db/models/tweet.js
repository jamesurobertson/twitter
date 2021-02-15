"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tweet = sequelize.define(
    "Tweet",
    {
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
      content: {
        type: DataTypes.STRING,
      },
      replyId: {
        type: DataTypes.INTEGER,
      },
      retweetId: {
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  Tweet.associate = function (models) {
    // associations can be defined here
    Tweet.belongsTo(models.User, { foreignKey: "userId" });
    Tweet.hasMany(models.Bookmark, { foreignKey: "tweetId" });
    Tweet.hasMany(models.Like, { foreignKey: "tweetId" });
  };
  return Tweet;
};
