import redisClient from "./RedisClient.js"
import { fileURLToPath } from 'url';
import Exception from "../Models/Exception.js";
const __filename = fileURLToPath(import.meta.url)

async function UpdateData(Model, CachName, findAllObject) {

    try {
        let list = []
        
        if (CachName == undefined || CachName == '') return
        
        if (!findAllObject) {
            list = await Model.findAll()
        }
        else {
            list = await Model.findAll(findAllObject)
        }

        await redisClient.del(CachName)

        list.forEach((item) => {
            redisClient.SADD(CachName, JSON.stringify(item))
        });
    }
    catch (err) {
        if (err instanceof Exception) throw err
        throw new Exception(err, __filename, RegisterToken.UpdateRefreshTokenList.name)
    }

}

export default UpdateData