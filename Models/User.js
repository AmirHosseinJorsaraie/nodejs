const { Model } = require('../Helpers/DatabaseConnection')
const redisClient = require('../Helpers/RedisClient')
const Role = require('./Role')

class User extends Model { }

User.GetUsers = async function () {
    var checkExists = await redisClient.exists('Users')
    if (checkExists == 0) {
        await this.UpdateUserList()
    }

    let users = await redisClient.SMEMBERS('Users', 0, -1);
    users.forEach((r, index) => {
        users[index] = JSON.parse(r)
    })

    return users
}

User.UpdateUserList = async function () {
    let List = await User.findAll()
    await redisClient.del('Users')
    List.forEach((R) => {
        redisClient.SADD('Users', JSON.stringify(R))
    })
}

User.AddUser = async function (username, password, roles) {
    try {
        var userRoles = []
        var allRoles = await Role.GetRoleList()
        roles.forEach((ur) => {
            allRoles.forEach((r) => {
                if (r.dataValues.id == ur) {
                    userRoles.push(ur);
                }
            })
        })
        var user = await User.create({ username: username, password: password })
        await user.addRoles(userRoles)
        this.UpdateUserList()
        return `Oppration successfully completed!`
    } catch (err) {
        return err
    }
}

User.UserVerification = async function (user) {
    let userList = await this.GetUsers()
    let userVerified = false
    let userId
    let userForFindRoles
    userList.forEach((u) => {
        if (u.dataValues.username == user.username && u.dataValues.password == user.password) {
            userId = u.dataValues.id
            userVerified = true
            userForFindRoles = u
        }
    })


    let userRoles = await userForFindRoles.getRoles()
    let userPermisions = [];
    for (var i = 0; i < userRoles.length; i++) {
        let permisions = await userRoles[i].getPermisions()
        for (var i = 0; i < permisions.length; i++) {
            userPermisions.push({ PermisionName: permisions[i].dataValues.PermisionName, id: permisions[i].dataValues.id })
        }
    }

    if (!userVerified) return { status: 403, message: 'username or password is incorrect.' }

    return { userId: userId, userRoles: userRoles }
}

module.exports = User
