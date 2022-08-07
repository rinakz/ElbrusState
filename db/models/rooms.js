const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Booking }) {
      this.hasMany(Booking, { foreignKey: 'room_id' });
    } // define association here
  }
  Rooms.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Rooms',
    }
  );

  return Rooms;
};
