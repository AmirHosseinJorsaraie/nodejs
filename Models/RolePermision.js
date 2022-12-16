const {sequelize,Model,DataTypes} = require('../Helpers/DatabaseConnection')
const Role = require('./Role')
const Permision = require('./Permision')


class RolePermision extends Model{}

RolePermision.init({
    RoleId:{
        type: DataTypes.INTEGER,
        references:{
            model: Role,
            key:'id'
        }
    },
    PermisionId:{
        type: DataTypes.INTEGER,
        references: {
            model: Permision,
            key: 'id'
        }
    }
},{sequelize,modelName:'RolePermision'})

module.exports = RolePermision