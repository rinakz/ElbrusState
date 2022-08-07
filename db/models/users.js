'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Booking, Roles}) {
      this.hasMany(Booking, { foreignKey: 'user_id' });
      this.belongsTo(Roles, { foreignKey: 'role_id' });
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    githubId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
