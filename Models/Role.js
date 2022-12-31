const { Model } = require('../Helpers/DatabaseConnection')
const redisClient = require('../Helpers/RedisClient')
const PermisionRepo = require('./Permision')

class Role extends Model { }

Role.GetRoleList = async function () {
    var checkExists = await redisClient.exists('Roles')
    if (checkExists == 0) {
        await this.UpdateRoleList()
    }

    let roles = await redisClient.SMEMBERS('Roles', 0, -1);
    roles.forEach((r, index) => {
        roles[index] = JSON.parse(r)
    })

    return roles
}

Role.UpdateRoleList = async function () {
    let List = await Role.findAll()
    await redisClient.del('Roles')
    List.forEach((R) => {
        redisClient.SADD('Roles', JSON.stringify(R))
    })
}

Role.AddRole = async function (role) {
    try {
        var permisionList = await PermisionRepo.GetPermisions()
        console.log(permisionList)
        var rolePermisions = []
        role.RolePermisions.forEach((rp) => {
            permisionList.forEach((p) => {
                if (p.id == rp) {
                    rolePermisions.push(p.id)
                }
            })
        })

        const Createdrole = await Role.create({ RoleName: role.RoleName })
        await Createdrole.addPermisions(rolePermisions)
        await this.UpdateRoleList()
        return 'Role Added Successfully'
    }
    catch (err) {
        console.log(err)
    }
}



module.exports = Role