const { Model } = require('../Helpers/DatabaseConnection')
const redisClient = require('../Helpers/RedisClient')


class Permision extends Model { }

Permision.GetPermisions = async function () {

    var checkExists = await redisClient.exists('Permisions')
    console.log(checkExists)
    if(checkExists == 0){
        await this.UpdatePermisionList()
    }

    let permisions = await redisClient.SMEMBERS('Permisions');
    permisions.forEach((p,index)=>{
        permisions[index] = JSON.parse(p)
    })

    return permisions

}

Permision.UpdatePermisionList = async function () {
    let List = await Permision.findAll()
    await redisClient.del('Permisions')
    List.forEach((permision) => {
        redisClient.SADD('Permisions', JSON.stringify(permision))
    })
}

Permision.AddPermision = async function (permision) {
    try {
        await Permision.create({ PermisionName: permision.PermisionName })
        await this.UpdatePermisionList()
        return 'Permision Added Successfully'
    }
    catch (err) {
        return err
    }
}




module.exports = Permision
