'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserCards = sequelize.define('UserCards', {
    petID: DataTypes.INTEGER,
    petName: DataTypes.STRING,
    petDescription: DataTypes.STRING,
    petIcon: DataTypes.STRING
  }, {});
  UserCards.associate = function(models) {
    // associations can be defined here
    UserCards.belongsTo(models.User);
  };
  return UserCards;
};