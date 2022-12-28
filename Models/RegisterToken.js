const User = require('./User')
const redisClient = require('../Helpers/RedisClient')
const { kMaxLength } = require('buffer')
const { sequelize, Model, DataTypes } = require('../Helpers/DatabaseConnection')

class RegisterToken extends Model { }

RegisterToken.GetRefreshTokens = async function () {
    var checkExists = await redisClient.exists('RefreshTokens')
    if (checkExists == 0) {
        await this.UpdateRefreshTokenList()
    }

    let refreshTokens = await redisClient.lRange('RefreshTokens', 0, -1);
    refreshTokens.forEach((p, index) => {
        refreshTokens[index] = JSON.parse(p)
    })

    return refreshTokens
}

RegisterToken.UpdateRefreshTokenList = async function () {
    let List = await RegisterToken.findAll()
    List.forEach((R) => {
        redisClient.rPush('RefreshTokens', JSON.stringify(R))
    })
}

RegisterToken.AddRefreshToken = async function (token, userId) {

    try {
        await RegisterToken.create({ token: token, UserId: userId })
        this.UpdateRefreshTokenList()
        return `Oppration successfully completed!`

    } catch (err) {
        return err
    }
}

RegisterToken.RefreshTokenExists = async function (userId) {
    var refreshTokenList = await this.GetRefreshTokens()
    let exists = false
    refreshTokenList.forEach((token) => {
        if (token.dataValues.UserId == userId) {
            exists = true
        }
    })
    return exists
}


RegisterToken.GetRefreshTokenByUserId = async function (userId) {
    var refreshTokenList = await this.GetRefreshTokens()
    let refToken;
    refreshTokenList.forEach((token) => {
        if (token.dataValues.UserId == userId) {
            refToken = token
        }
    })
    if (!refToken) return undefined
    return refToken.dataValues.token
}


RegisterToken.GetRefreshToken = async function (Rtoken) {
    var refreshTokenList = await this.GetRefreshTokens()
    let refToken;
    refreshTokenList.forEach((token) => {
        if (token.dataValues.token == Rtoken) {
            refToken = token
        }
    })
    if (!refToken) return undefined
    return refToken.dataValues.token

}

RegisterToken.DeleteRefreshToken = async function (Rtoken) {

    await RegisterToken.destroy({
        where: {
            token: Rtoken
        }
    })

    this.UpdateRefreshTokenList()
}

RegisterToken.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: 'RegisterToken', freezeTableName: true })

RegisterToken.belongsTo(User)

    ; (async () => {
        await RegisterToken.GetRefreshTokens();
    })()

async function CreateTable() {
    await RegisterToken.sync()
}

async function DropTable() {
    await RegisterToken.drop()
}

module.exports = RegisterToken
