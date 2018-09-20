'use strict';

module.exports = (sequelize, DataTypes) => {
    let Person = sequelize.define('orders', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        productName: {
            type: DataTypes.TEXT
        },
        quantity: {
            type: DataTypes.INTEGER
        }
    });
    return Person;
}