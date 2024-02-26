'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // currentNumber: DataTypes.INTEGER,
        // maxNumber: DataTypes.INTEGER,
        // date: DataTypes.DATE,
        // timeType: DataTypes.STRING,
        // doctorID: DataTypes.INTEGER
        await queryInterface.createTable('DoctorInfor', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorID: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            priceID: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            provinceID: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            paymentID: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            addressClinic: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nameClinic: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            note: {
                type: Sequelize.STRING,
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('DoctorInfor');
    }
};