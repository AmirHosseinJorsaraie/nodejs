import { Model } from '../Helpers/DatabaseConnection.js'
import redisClient from '../Helpers/RedisClient.js'
import Exception from './Exception.js'
import {fileURLToPath} from 'url';
import UpdateData from '../Helpers/GenericDTO.js';
const __filename = fileURLToPath(import.meta.url) 

class Permision extends Model { }

Permision.GetPermisions = async function () {

    try {
        var checkExists = await redisClient.exists('Permisions')
        console.log(checkExists)
        if (checkExists == 0) {
            await UpdateData(Permision,'Permisions')
        }

        let permisions = await redisClient.SMEMBERS('Permisions');
        permisions.forEach((p, index) => {
            permisions[index] = JSON.parse(p)
        })

        return permisions
    }
    catch (err) {
        if(err instanceof Exception) throw err
        throw new Exception(err,__filename,Permision.GetPermisions.name)
    }
}

Permision.AddPermision = async function (permision) {
    try {
        await Permision.create({ PermisionName: permision.PermisionName })
        await UpdateData(Permision,'Permisions')
    }
    catch (err) {
        if(err instanceof Exception) throw err
        throw new Exception(err,__filename,Permision.AddPermision.name)
    }
}




export default Permision