"use strict";
module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      tag: {
        type: DataTypes.STRING,
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
  Hashtag.associate = function (models) {
    // associations can be defined here
  };
  return Hashtag;
};
