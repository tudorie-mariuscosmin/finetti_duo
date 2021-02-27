const sequelize = require('../config/db')
const Sequelize = require('sequelize')

const userModel = require('./user')
const economiesModel = require('./economies')
const investmentsModel = require('./investments')
const models = {
    User: userModel(sequelize, Sequelize),
    Economies: economiesModel(sequelize, Sequelize),
    Investments: investmentsModel(sequelize, Sequelize)
}

models.User.hasMany(models.Economies)
models.User.hasMany(models.Investments)



module.exports = { ...models, sequelize }