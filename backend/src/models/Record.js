const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Employee = require('./Employee');

const Record = sequelize.define('Record', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: 'id',
    },
  },
  recordType: {
    type: DataTypes.ENUM('INGRESO', 'EGRESO'),
    allowNull: false,
  },
  actualDateTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  registeredDateTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
});

Employee.hasMany(Record, { foreignKey: 'employeeId' });
Record.belongsTo(Employee, { foreignKey: 'employeeId' });

module.exports = Record;