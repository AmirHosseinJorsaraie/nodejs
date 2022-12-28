const { sequelize, Model, DataTypes } = require('../Helpers/DatabaseConnection')
const Role = require('./Role')
const redisClient = require('../Helpers/RedisClient')
const RolePermision = require('./RolePermision')


class Permision extends Model { }

Permision.GetPermisions = async function () {
    
    var checkExists = await redisClient.exists('Permisions')
    if(checkExists == 0){
        await this.UpdatePermisionList()
    }
    
    let permisions = await redisClient.lRange('Permisions',0,-1);
    permisions.forEach((p,index)=>{
        permisions[index] = JSON.parse(p)
    })

    return permisions
}

Permision.UpdatePermisionList = async function () {
    let List = await Permision.findAll()
    List.forEach((permision)=>{
        redisClient.rPush('Permisions',JSON.stringify(permision))
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

; (async () => {
    await Permision.GetPermisions();
})()

Permision.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    PermisionName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: 'Permision' })

Permision.belongsToMany(Role, { through: RolePermision })
Role.belongsToMany(Permision, { through: RolePermision })

    

module.exports = Permision
