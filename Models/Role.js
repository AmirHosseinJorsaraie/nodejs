import { Model } from '../Helpers/DatabaseConnection.js';
import redisClient from '../Helpers/RedisClient.js';
import Exception from './Exception.js';
import PermisionRepo from './Permision.js';
import {fileURLToPath} from 'url';
import UpdateData from '../Helpers/GenericDTO.js';
const __filename = fileURLToPath(import.meta.url) 

class Role extends Model { }

Role.GetRoleList = async function () {

    try {
        var checkExists = await redisClient.exists('Roles')
        if (checkExists == 0) {
            await UpdateData(Role,'Roles')
        }

        let roles = await redisClient.SMEMBERS('Roles', 0, -1);
        roles.forEach((r, index) => {
            roles[index] = JSON.parse(r)
        })

        return roles
    }
    catch (err) {
        if (err instanceof Exception) throw err
        throw new Exception(err, __filename, Role.GetRoleList.name)
    }

}

Role.AddRole = async function (role) {
    try {
        var permisionList = await PermisionRepo.GetPermisions()
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
        await UpdateData(Role,'Roles')

    }
    catch (err) {
        if (err instanceof Exception) throw err
        throw new Exception(err, __filename, Role.AddRole.name)
    }
}



export default Role