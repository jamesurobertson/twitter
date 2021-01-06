"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserConversation = sequelize.define(
    "UserConversation",
    {
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },

      conversationId: {
        type: DataTypes.INTEGER,
        references: { model: "Conversations" },
      },
    },
    {}
  );
  UserConversation.associate = function (models) {
    // associations can be defined here
    UserConversation.belongsTo(models.Conversation, {
      foreignKey: "conversationId",
    });
    UserConversation.belongsTo(models.User, { foreignKey: "userId" });
  };
  return UserConversation;
};
