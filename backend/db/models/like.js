"use strict";
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      tweetId: {
        type: DataTypes.INTEGER,
        references: { model: "Tweets" },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
    },
    {}
  );
  Like.associate = function (models) {
    // associations can be defined
    Like.belongsTo(models.User, { foreignKey: "userId" });
    Like.belongsTo(models.Tweet, { foreignKey: "tweetId" });
  };
  return Like;
};
