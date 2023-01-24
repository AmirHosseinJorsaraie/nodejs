import { sequelize, DataTypes } from './DatabaseConnection.js'
import Permision from '../Models/Permision.js'
import Role from '../Models/Role.js'
import User from '../Models/User.js'
import RegisterToken from '../Models/RegisterToken.js'
import UserRole from '../Models/UserRole.js'
import RolePermision from '../Models/RolePermision.js'
import configuration from '../Constants/AuthServer/default-data.js'
//Import here

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { sequelize, modelName: 'User' })


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


UserRole.init({
    RoleId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id'
        }
    }
}, { sequelize, modelName: 'UserRole' })


RegisterToken.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING(1224),
        allowNull: false
    }
}, { sequelize, modelName: 'RegisterToken', freezeTableName: true })


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



RolePermision.init({
    RoleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id'
        }
    },
    PermisionId: {
        type: DataTypes.INTEGER,
        references: {
            model: Permision,
            key: 'id'
        }
    }
}, { sequelize, modelName: 'RolePermision' })


Role.belongsToMany(User, { through: UserRole })
User.belongsToMany(Role, { through: UserRole })

RegisterToken.belongsTo(User)

Permision.belongsToMany(Role, { through: RolePermision })
Role.belongsToMany(Permision, { through: RolePermision })


    ; (async () => {
        await sequelize.sync()
        var IsEmpty = await CheckEmpty()
        if (IsEmpty)
            await config()
        await Permision.GetPermisions()
        await RegisterToken.GetRefreshTokens()
        await Role.GetRoleList()
        await User.GetUsers()
    })()



async function config() {

    for (var i = 0; i < configuration.PERMISIONS.length; i++) {
        await Permision.AddPermision(configuration.PERMISIONS[i])
    }


    for (var i = 0; i < configuration.ROLES.length; i++) {
        await Role.AddRole(configuration.ROLES[i])
    }


    for (var i = 0; i < configuration.USERS.length; i++) {
        await User.AddUser(configuration.USERS[i].username, configuration.USERS[i].password, configuration.USERS[i].Roles)
    }
}

async function CheckEmpty() {
    var users = await User.findAll()
    var permisions = await Permision.findAll()
    var roles = await Role.findAll()
    
    if (users.length == 0 && permisions.length == 0 && roles.length == 0) return true
    else return false
}

export default null
