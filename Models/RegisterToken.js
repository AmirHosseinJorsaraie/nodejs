import { Model } from '../Helpers/DatabaseConnection.js';
import redisClient from '../Helpers/RedisClient.js';
import Exception from './Exception.js';
import {fileURLToPath} from 'url';
import UpdateData from '../Helpers/GenericDTO.js';
const __filename = fileURLToPath(import.meta.url) 

class RegisterToken extends Model { }

RegisterToken.GetRefreshTokens = async function () {

    try {
        var checkExists = await redisClient.exists('RefreshTokens')
        if (checkExists == 0) {
            await this.UpdateRefreshTokenList()
        }

        let refreshTokens = await redisClient.SMEMBERS('RefreshTokens', 0, -1);
        refreshTokens.forEach((p, index) => {
            refreshTokens[index] = JSON.parse(p)
        })

        return refreshTokens
    }
    catch (err) {
        if (err instanceof Exception) throw err
        throw new Exception(err, __filename, RegisterToken.GetRefreshTokens.name)
    }

}

RegisterToken.UpdateRefreshTokenList = async function () {

    try {
        // let List = await RegisterToken.findAll()
        // await redisClient.del('RefreshTokens')
        // List.forEach((R) => {
        //     redisClient.SADD('RefreshTokens', JSON.stringify(R))
        // })
        await UpdateData(RegisterToken,'RefreshTokens')
    }
    catch (err) {
        if (err instanceof Exception) throw err
        throw new Exception(err, __filename, RegisterToken.UpdateRefreshTokenList.name)
    }
}

RegisterToken.AddRefreshToken = async function (token, userId) {

    try {
        await RegisterToken.create({ token: token, UserId: userId })
        this.UpdateRefreshTokenList()
        
    } catch (err) {
        if (err instanceof Exception) throw err
        throw new Exception(err, __filename, RegisterToken.AddRefreshToken.name)
    }
}

RegisterToken.RefreshTokenExists = async function (userId) {
    try {
        var refreshTokenList = await this.GetRefreshTokens()
        let exists = false
        refreshTokenList.forEach((token) => {
            if (token.UserId == userId) {
                exists = true
            }
        })
        return exists
    } catch (err) {
        if(err instanceof Exception) throw err
        throw new Exception(err,__filename,RegisterToken.RefreshTokenExists.name)
    }
}


RegisterToken.GetRefreshTokenByUserId = async function (userId) {
    try {
        var refreshTokenList = await this.GetRefreshTokens()
        let refToken;
        refreshTokenList.forEach((token) => {
            if (token.UserId == userId) {
                refToken = token
            }
        })
        if (!refToken) return undefined
        return refToken.token
    }
    catch (err) {
        if(err instanceof Exception) throw err
        throw new Exception(err,__filename,RegisterToken.GetRefreshTokenByUserId.name)
    }
}


RegisterToken.GetRefreshToken = async function (Rtoken) {

    try {
        var refreshTokenList = await this.GetRefreshTokens()
        let refToken;
        refreshTokenList.forEach((token) => {
            if (token.token == Rtoken) {
                refToken = token
            }
        })
        if (!refToken) return undefined
        return refToken.token
    }
    catch (err) {
        if(err instanceof Exception) throw err
        throw new Exception(err,__filename,RegisterToken.GetRefreshToken.name)
    }
}

RegisterToken.DeleteRefreshToken = async function (Rtoken) {

    try {
        await RegisterToken.destroy({
            where: {
                token: Rtoken
            }
        })

        this.UpdateRefreshTokenList()

    } catch (err) {
        if(err instanceof Exception) throw err
        throw new Exception(err,__filename,RegisterToken.DeleteRefreshToken.name)
    }
}


export default RegisterToken