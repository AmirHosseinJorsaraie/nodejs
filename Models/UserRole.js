const User = require('./User')
const Role = require('./Role')
const { sequelize, Model, DataTypes } = require('../Helpers/DatabaseConnection')

class UserRole extends Model{}

UserRole.init({
    RoleId:{
        type: DataTypes.INTEGER,
        references:{
            model:User,
            key:'id'
        }
    },
    UserId:{
        type: DataTypes.INTEGER,
        references:{
            model:Role,
            key:'id'
        }
    }
},{sequelize,modelName:'UserRole'})

module.exports = UserRole