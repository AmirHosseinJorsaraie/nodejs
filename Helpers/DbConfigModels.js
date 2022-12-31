const { sequelize, DataTypes } = require('./DatabaseConnection')
const User = require('../Models/User')
const Permision = require('../Models/Permision')
const RegisterToken = require('../Models/RegisterToken')
const Role = require('../Models/Role')
const UserRole = require('../Models/UserRole')
const RolePermision = require('../Models/RolePermision')
const configuration = require('../configuration')

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
        type: DataTypes.STRING,
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

    addPermisions()
    addRoles()
    addUsers()

    function addUsers() {
        configuration.Users.forEach((user) => {
            User.AddUser(user.username, user.password, user.Roles)
        })
    }
    function addPermisions() {
        configuration.Permisions.forEach((permision) => {
            Permision.AddPermision(permision)
        })
    }
    function addRoles() {
        configuration.Roles.forEach((role) => {
            Role.AddRole(role)
        })
    }
}

async function CheckEmpty() {
    var users = await User.findAll()
    var permisions = await Permision.findAll()
    var roles = await Role.findAll()
    if (users.length == 0 && permisions.length == 0 && roles.length == 0) return true
    else return false
}