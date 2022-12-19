const {sequelize} = require('./DatabaseConnection')
const User = require('../Models/User')
const Permision = require('../Models/Permision')
const RegisterToken = require('../Models/RegisterToken')
const Role = require('../Models/Role')
const UserRole = require('../Models/UserRole')
const RolePermision = require('../Models/RolePermision')

sequelize.sync();