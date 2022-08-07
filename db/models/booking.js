'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users, Rooms, Type, Days}) {
      this.belongsTo(Users, { foreignKey: 'user_id' });
      this.belongsTo(Rooms, { foreignKey: 'room_id' });
      this.belongsTo(Type, { foreignKey: 'type_id' });
      this.belongsTo(Days, { foreignKey: 'day_id' });
    }
  }
  Booking.init({
    user_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    day_id: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    time_start: DataTypes.STRING,
    time_end: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
