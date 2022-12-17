const User = require('./User')
const { kMaxLength } = require('buffer')
const {sequelize, Model, DataTypes} = require('../Helpers/DatabaseConnection')

class RegisterToken extends Model{}

RegisterToken.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    token:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{sequelize,modelName:'RegisterToken',freezeTableName: true})

RegisterToken.belongsTo(User)

//CreateTable().then(()=>console.log('Done'))
//DropTable().then(()=>console.log('Done'))

async function CreateTable(){
    await RegisterToken.sync()
}

async function DropTable(){
    await RegisterToken.drop()
}

module.exports = RegisterToken