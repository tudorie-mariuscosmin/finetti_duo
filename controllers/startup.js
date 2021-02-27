const models = require('../models')

module.exports = {
    resetDatabase: async (req, res) => {
        try {
            await models.sequelize.sync({ force: true })
            res.status(200).json({ message: "created" })

        } catch (err) {
            if (err) {
                res.status(500).json({ message: 'Error encountered when creating tables' });
                console.warn(err)
            }
        }
    }
}