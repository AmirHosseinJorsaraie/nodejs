const Role = require('../Models/Role')
const PermisionRepo = require('./PermisionRepository')


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


module.exports = { AddRole }