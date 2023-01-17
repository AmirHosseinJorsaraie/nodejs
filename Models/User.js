import { Model } from '../Helpers/DatabaseConnection.js';
import redisClient from '../Helpers/RedisClient.js';
import Exception from './Exception.js';
import Role from './Role.js';
import {fileURLToPath} from 'url';
import UpdateData from '../Helpers/GenericDTO.js';
const __filename = fileURLToPath(import.meta.url) 

class User extends Model { }

User.GetUsers = async function () {

    try {
        var checkExists = await redisClient.exists('Users')
        if (checkExists == 0) {
            await this.UpdateUserList()
        }

        let users = await redisClient.SMEMBERS('Users', 0, -1);
        users.forEach((r, index) => {
            users[index] = JSON.parse(r)
        })

        return users
    } catch (err) {
        if (err instanceof Exception) throw err
        throw new Exception(err, __filename, User.GetUsers.name)
    }
}

User.UpdateUserList = async function () {
    try {
        // let List = await User.findAll({
        //     include: {
        //         model: Role,
        //         include: this.sequelize.models.Permision
        //     }
        // })
        // await redisClient.del('Users')
        // List.forEach((R) => {
        //     redisClient.SADD('Users', JSON.stringify(R))
        // })
        await UpdateData(User,'Users')
    } catch (err) {
        if (err instanceof Exception) throw err
        throw new Exception(err, __filename, User.UpdateUserList.name)
    }
}

User.AddUser = async function (username, password, roles) {
    try {
        var userRoles = []
        var allRoles = await Role.GetRoleList()
        roles.forEach((ur) => {
            allRoles.forEach((r) => {
                if (r.id == ur) {
                    userRoles.push(ur);
                }
            })
        })
        var user = await User.create({ username: username, password: password })
        await user.addRoles(userRoles)
        await this.UpdateUserList()
 
    } catch (err) {
        if (err instanceof Exception) throw err
        throw new Exception(err, __filename, User.AddUser.name)
    }
}

User.UserVerification = async function (user) {

    try {
        let userList = await this.GetUsers()
        let userVerified = false
        let userId
        let userInfo
        userList.forEach((u) => {
            if (u.username == user.username && u.password == user.password) {
                userId = u.id
                userVerified = true
                userInfo = u
            }
        })

        if (!userVerified) return { notVeryfied: true }

        if (userInfo.Roles.lenght == 0) return { noRole: true }

        let userRoles = []
        let userPermisions = []
        userInfo.Roles.forEach((Role) => {
            userRoles.push({ id: Role.id, RoleName: Role.RoleName })
            Role.Permisions.forEach((permision) => {
                userPermisions.push({ id: permision.id, PermisionName: permision.PermisionName })
            })
        })

        return { userId: userId, userRoles: userRoles, userPermisions: userPermisions }
    }
    catch (err) {
        if (err instanceof Exception) throw err
        throw new Exception(err,__filename,User.UserVerification.name)
    }
}

export default User