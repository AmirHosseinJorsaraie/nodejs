const User = require('../Models/User')

var userList = []

GetUsers()

async function AddUser(username, password) {
    try {
        await User.create({ username: username, password: password })
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
    userList.forEach((u) => {
        if (u.dataValues.username == user.username && u.dataValues.password == user.password) {
            userId = u.dataValues.id
            userVerified = true
        }
    })

    if (!userVerified) return { status: 403, message: 'username or password is incorrect.' }

    return { userId: userId }
}

module.exports = { AddUser, GetUsers, UserVerification }