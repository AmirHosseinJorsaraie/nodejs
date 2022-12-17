const { sequelize, Model, DataTypes } = require('../Helpers/DatabaseConnection')
const User = require('./User')
const UserRole = require('./UserRole')

class Role extends Model { }

Role.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    RoleName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { sequelize, modelName: 'Role' })

Role.belongsToMany(User, { through: UserRole })
User.belongsToMany(Role, { through: UserRole })

//sequelize.sync()

module.exports = Role