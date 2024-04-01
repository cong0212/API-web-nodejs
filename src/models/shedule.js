'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Schedule.belongsTo(models.ALLcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeData' })

            Schedule.belongsTo(models.User, { foreignKey: 'doctorID', targetKey: 'id', as: 'doctorData' })

            Schedule.belongsTo(models.DoctorInfor, { foreignKey: 'doctorID' });

            Schedule.hasMany(models.Booking, {
                foreignKey: 'doctorID', // Khóa ngoại trên bảng Booking
                sourceKey: 'doctorID', // Khóa chính trên bảng Schedule
                as: 'bookingData'
            });
        }
    };
    Schedule.init({
        currentNumber: DataTypes.INTEGER,
        maxNumber: DataTypes.INTEGER,
        date: DataTypes.STRING,
        timeType: DataTypes.STRING,
        doctorID: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};