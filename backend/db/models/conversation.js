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
      // might not need bottom 2, testing out.
      //   foreignKey: "conversationId",
      //   otherKey: "userId",
    });
  };
  return Conversation;
};
