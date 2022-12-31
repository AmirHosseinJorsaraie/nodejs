const Role = require('../Models/Role')
const PermisionRepo = require('./PermisionRepository')

var RoleList = []
UpdateRoleList()

async function AddRole(role) {
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
        return 'Role Added Successfully'
    }
    catch (err) {
        return err
    }
}

async function GetRoleList() {
    if (RoleList.length == 0) {
        await UpdateRoleList()
    }
    return RoleList
}

async function UpdateRoleList() {
    RoleList = await Role.findAll()
}

module.exports = { AddRole , GetRoleList}