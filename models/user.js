'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    githubId: DataTypes.STRING,
    googleId: DataTypes.STRING,
    cards: DataTypes.STRING,
    gold: DATATypes.Integer
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.UserCards);
  };
  return User;
};