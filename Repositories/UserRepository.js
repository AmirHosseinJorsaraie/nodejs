const User = require('../Models/User')
const Role = require('../Repositories/RoleRepository')

var userList = []

GetUsers()

async function AddUser(username, password, roles) {
    try {
        var userRoles = []
        var allRoles = await Role.GetRoleList()
        roles.forEach((ur)=>{
            allRoles.forEach((r)=>{
                if(r.dataValues.id == ur){
                    userRoles.push(ur);
                }
            })
        })
        var user = await User.create({ username: username, password: password })
        await user.addRoles(userRoles)
        UpdateUserList()
        return `Oppration successfully completed!`
    } catch (err) {
        return err
    }
}

async function GetUsers() {
    if (!userList.length == 0) return userList
    await UpdateUserList()
    return userList
}

async function UpdateUserList() {
    userList = await User.findAll()
}

async function UserVerification(user) {
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
    await userRoles.forEach(async function(role){
        let permisions = await role.getPermisions()
        await permisions.forEach(async (p) => {
            userPermisions.push({ PermisionName: p.dataValues.PermisionName, id: p.dataValues.id })
            console.log(userPermisions)
        })
    })
  
    if (!userVerified) return { status: 403, message: 'username or password is incorrect.' }

    return { userId: userId , userRoles: userRoles}
}

module.exports = { AddUser, GetUsers, UserVerification }
