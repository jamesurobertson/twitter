"use strict";
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    "Conversation",
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  Conversation.associate = function (models) {
    // associations can be defined here
    Conversation.belongsToMany(models.User, {
      through: models.UserConversation,
      foreignKey: "conversationId",
      otherKey: "userId",
    });
  };
  return Conversation;
};
