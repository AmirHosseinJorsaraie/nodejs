require('dotenv').config({path:'../.env'})
const {Sequelize, Model, DataTypes} = require('sequelize')
const sequelize = new Sequelize(process.env.DbName,process.env.DbUsername,process.env.DbPassword,{
    dialect: 'mssql',
    host: 'localhost'
})

module.exports = {sequelize,Model,DataTypes}