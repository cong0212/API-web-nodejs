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
        static associate(models) {
            // define association here
            Booking.belongsTo(models.User, { foreignKey: 'patientID', targetKey: 'id', as: 'patientData' })

            Booking.belongsTo(models.ALLcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeDataPatient' })

            Booking.belongsTo(models.DoctorInfor, { foreignKey: 'doctorID' });

            Booking.belongsTo(models.Schedule, {
                foreignKey: 'doctorID', // Khóa ngoại trên bảng Booking
                targetKey: 'doctorID', // Khóa chính trên bảng Schedule
                as: 'scheduleData'
            });
        }
    };
    Booking.init({
        statusID: DataTypes.STRING,
        doctorID: DataTypes.INTEGER,
        patientID: DataTypes.INTEGER,
        date: DataTypes.STRING,
        timeType: DataTypes.STRING,
        token: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};