const Permision = require('../Models/Permision')

var PermisionList = []
UpdatePermisionList()

async function AddPermision(permision) {
    try {
        await Permision.create({ PermisionName: permision.PermisionName })
        return 'Permision Added Successfully'
    }
    catch (err) {
        return err
    }   
}

async function GetPermisions(){
    if(PermisionList.length == 0){
        return await Permision.findAll()
    }
    return PermisionList
}

async function UpdatePermisionList(){
    PermisionList = await Permision.findAll()
}  

module.exports = {AddPermision,GetPermisions}
