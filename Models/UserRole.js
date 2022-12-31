const User = require('./User')
const Role = require('./Role')
const { sequelize, Model, DataTypes } = require('../Helpers/DatabaseConnection')

class UserRole extends Model{}



module.exports = UserRole