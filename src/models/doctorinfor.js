'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorInfor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DoctorInfor.belongsTo(models.User, { foreignKey: 'doctorID' });
      DoctorInfor.belongsTo(models.Specialty, { foreignKey: 'specialtyID' });
      DoctorInfor.hasMany(models.Booking, { foreignKey: 'doctorID' });
      DoctorInfor.hasMany(models.Schedule, { foreignKey: 'doctorID' });

      DoctorInfor.belongsTo(models.ALLcode, { foreignKey: 'priceID', targetKey: 'keyMap', as: 'priceTypeData' })
      DoctorInfor.belongsTo(models.ALLcode, { foreignKey: 'provinceID', targetKey: 'keyMap', as: 'provinceTypeData' })
      DoctorInfor.belongsTo(models.ALLcode, { foreignKey: 'paymentID', targetKey: 'keyMap', as: 'paymentTypeData' })

    }
  };
  DoctorInfor.init({
    doctorID: DataTypes.INTEGER,
    specialtyID: DataTypes.INTEGER,
    clinicID: DataTypes.INTEGER,
    priceID: DataTypes.STRING,
    provinceID: DataTypes.STRING,
    paymentID: DataTypes.STRING,
    addressClinic: DataTypes.STRING,
    nameClinic: DataTypes.STRING,
    note: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DoctorInfor',
    freezeTableName: true
  });
  return DoctorInfor;
};