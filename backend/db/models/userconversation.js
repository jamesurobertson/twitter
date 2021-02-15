"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserConversation = sequelize.define(
    "UserConversation",
    {
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },

      conversationId: {
        type: DataTypes.INTEGER,
        references: { model: "Conversations", key: "id" },
      },
    },
    {}
  );
  UserConversation.associate = function (models) {
    // associations can be defined here
    // might not need. testing out.
    // UserConversation.belongsTo(models.Conversation, {
    //   foreignKey: "conversationId",
    // });
    // UserConversation.belongsTo(models.User, { foreignKey: "userId" });
  };
  return UserConversation;
};
