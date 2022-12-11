const RegisterToken = require('../Models/RegisterToken')

var refreshTokenList = []

GetRefreshTokens()

async function AddRefreshToken(token, userId) {

    try {
        await RegisterToken.create({ token: token, UserId: userId })
        UpdateUserList()
        return `Oppration successfully completed!`

    } catch (err) {
        return err
    }
}

async function GetRefreshTokens() {
    if (!refreshTokenList.length == 0) return refreshTokenList
    await UpdateRefreshTokenList()
    return refreshTokenList
}

async function UpdateRefreshTokenList() {
    refreshTokenList = await RegisterToken.findAll()
}

async function RefreshTokenExists(userId) {
    let exists = false
    refreshTokenList.forEach((token) => {
        if (token.dataValues.UserId == userId) {
            exists = true
        }
    })
    return exists
}

async function GetRefreshTokenByUserId(userId) {
    let refToken;
    refreshTokenList.forEach((token) => {
        if (token.dataValues.UserId == userId) {
            refToken = token
        }
    })
    if (!refToken) return undefined
    return refToken.dataValues.token
}

async function GetRefreshToken(Rtoken) {
    let refToken;
    refreshTokenList.forEach((token) => {
        if (token.dataValues.token == Rtoken) {
            refToken = token
        }
    })
    if (!refToken) return undefined
    return refToken.dataValues.token

}

async function DeleteRefreshToken(Rtoken) {

    await RegisterToken.destroy({
        where: {
            token: Rtoken
        }
    })

    UpdateRefreshTokenList()
}

module.exports = { AddRefreshToken, GetRefreshTokens, RefreshTokenExists, GetRefreshTokenByUserId, GetRefreshToken, DeleteRefreshToken }