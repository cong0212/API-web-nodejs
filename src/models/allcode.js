'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ALLcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ALLcode.hasMany(models.User, { foreignKey: 'positionID', as:'positionData' })
            ALLcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
            ALLcode.hasMany(models.Schedule, { foreignKey: 'timeType', as: 'timeTypeData' })

            ALLcode.hasMany(models.DoctorInfor, { foreignKey: 'priceID', as: 'priceTypeData' })
            ALLcode.hasMany(models.DoctorInfor, { foreignKey: 'provinceID', as: 'provinceTypeData' })
            ALLcode.hasMany(models.DoctorInfor, { foreignKey: 'paymentID', as: 'paymentTypeData' })

            ALLcode.hasMany(models.Booking, {foreignKey: 'timeType', as: 'timeTypeDataPatient'})
        }
    };
    ALLcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEN: DataTypes.STRING,
        valueVI: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ALLcode',
    });
    return ALLcode;
};