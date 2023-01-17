import redisClient from "./RedisClient.js"
import {fileURLToPath} from 'url';
import Exception from "../Models/Exception.js";
const __filename = fileURLToPath(import.meta.url) 

async function UpdateData(Model, CachName) {

    try {
        if (CachName == undefined || CachName == '') return
        let list = await Model.findAll()
        
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