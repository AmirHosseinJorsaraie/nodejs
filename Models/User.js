require('dotenv').config({
    path: '../.env'
})
const {sequelize, Model, DataTypes} = require('../Helpers/DatabaseConnection')

class User extends Model{}

User.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},{sequelize,modelName:'User'})


//CreateTable().then(()=>console.log('Done'))

//DropTable().then(()=>console.log('Done'))


async function CreateTable(){
    await User.sync()
}

async function DropTable(){
    await User.drop()
}

module.exports = User