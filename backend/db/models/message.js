"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      conversationId: {
        type: DataTypes.INTEGER,
      },
      content: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  Message.associate = function (models) {
    // associations can be defined here
    Message.belongsTo(models.User, { foreignKey: "userId" });
    Message.belongsTo(models.Conversation, { foreignKey: "conversationId" });
  };
  return Message;
};
