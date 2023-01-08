import dotenv from 'dotenv';
dotenv.config();
import { Sequelize, Model, DataTypes } from 'sequelize'
const sequelize = new Sequelize(process.env.DbName,process.env.DbUsername,process.env.DbPassword,{
    dialect: 'mssql',
    host: 'localhost'
})
export {sequelize,Model,DataTypes}
