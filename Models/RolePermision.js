const {sequelize,Model,DataTypes} = require('../Helpers/DatabaseConnection')
const Role = require('./Role')
const Permision = require('./Permision')


class RolePermision extends Model{}



module.exports = RolePermision