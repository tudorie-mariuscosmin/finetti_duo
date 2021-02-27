const sequelize = require('../config/db')
const Sequelize = require('sequelize')

const userModel = require('./user')
const economiesModel = require('./economies')
const investingsModel = require('./investings')
const models = {
    User: userModel(sequelize, Sequelize),
    Economies: economiesModel(sequelize, Sequelize),
    Investings: investingsModel(sequelize, Sequelize)
}

models.User.hasMany(models.Economies)
models.User.hasMany(models.Investings)



module.exports = { ...models, sequelize }