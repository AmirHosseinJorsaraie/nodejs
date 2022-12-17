const { sequelize, Model, DataTypes } = require('../Helpers/DatabaseConnection')
const Role = require('./Role')
const RolePermision = require('./RolePermision')


class Permision extends Model { }

Permision.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    PermisionName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: 'Permision' })

Permision.belongsToMany(Role, { through: RolePermision })
Role.belongsToMany(Permision, { through: RolePermision })

//sequelize.sync()

module.exports = Permision