'use strict';

module.exports = (sequelize, DataTypes) => {
    let Person = sequelize.define('persons', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        firstName: {
            type: DataTypes.TEXT
        },
        lastName: {
            type: DataTypes.STRING
        }
    });
    return Person;
}