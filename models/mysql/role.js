const DataTypes = require('sequelize');
const sequelize = require('../../config/db/mysql');

const Role = sequelize.define('role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    validate: {
    }
  },
  name: {
    type: DataTypes.STRING,
    validate: {
    }
  }
},
{
  tableName: 'role',
  createdAt: false,
  updatedAt: false
});

module.exports = Role;