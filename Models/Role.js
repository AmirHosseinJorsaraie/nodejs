const { sequelize, Model, DataTypes } = require('../Helpers/DatabaseConnection')
const redisClient = require('../Helpers/RedisClient')
const PermisionRepo = require('./Permision')
const User = require('./User')
const UserRole = require('./UserRole')

class Role extends Model { }

Role.GetRoleList = async function () {
    var checkExists = await redisClient.exists('Roles')
    if (checkExists == 0) {
        await this.UpdateRoleList()
    }

    let roles = await redisClient.lRange('Roles', 0, -1);
    roles.forEach((r, index) => {
        roles[index] = JSON.parse(r)
    })

    return roles
}

Role.UpdateRoleList = async function () {
    let List = await Role.findAll()
    List.forEach((R) => {
        redisClient.rPush('Roles', JSON.stringify(R))
    })
}

Role.AddRole = async function (role) {
    try {
        var permisionList = await PermisionRepo.GetPermisions()
        var rolePermisions = []
        role.RolePermisions.forEach((rp) => {
            permisionList.forEach((p) => {
                if (p.dataValues.id == rp) {
                    rolePermisions.push(p)
                }
            })
        })
        console.log('im here')
        const Createdrole = await Role.create({ RoleName: role.RoleName })
        await Createdrole.addPermisions(rolePermisions)
        await this.UpdateRoleList()
        return 'Role Added Successfully'
    }
    catch (err) {
        return err
    }
}

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
