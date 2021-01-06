"use strict";
module.exports = (sequelize, DataTypes) => {
  const Mention = sequelize.define(
    "Mention",
    {
      userIdMentioned: {
        type: DataTypes.INTEGER,
      },
      medium: {
        type: DataTypes.STRING,
      },
      mediumId: {
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  Mention.associate = function (models) {
    // associations can be defined here

    Mention.belongsTo(models.User, { foreignKey: "userIdMentioned" });
  };
  return Mention;
};
