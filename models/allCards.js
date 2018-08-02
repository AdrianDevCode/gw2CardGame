'use strict';
module.exports = (sequelize, DataTypes) => {
  var AllCards = sequelize.define('AllCards', {
    petID: DataTypes.INTEGER,
    petName: DataTypes.STRING,
    petDescription: DataTypes.STRING,
    petIcon: DataTypes.STRING,
  }, {});
  AllCards.associate = function(models) {
    // associations can be defined here
    AllCards.hasMany(models.UserCards);
  };
  return AllCards;
};