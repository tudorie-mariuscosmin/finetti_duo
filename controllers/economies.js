const { User, Economies } = require("../models")

module.exports = {

    findAll: async (req, res) => {
        try {
            const economies = await Economies.findAll({ where: { userId: req.user.id } })
            if (economies) {
                const data = economies.map(x => {
                    return { id: x.id, name: x.name, description: x.description, value: x.value }
                })
                res.json(data)
            }
        } catch (err) {
            console.warn(err)
            res.status(500).json({ message: err.message })
        }
    },

    createEconomy: async (req, res) => {
        try {
            if (!req.body.name || !req.body.value || !req.body.isIncome) {
                res.status(400).json({ message: "Please enter all data" })
            } else {
                let economy = new Economies(req.body)
                economy.userId = req.user.id
                await economy.save()
                res.status(201).json({ message: "created" })
            }

        } catch (err) {
            console.warn(err)
            res.status(500).json({ message: err.message })
        }
    },

    updateEconomy: async (req, res) => {
        try {
            let economy = await Economies.findByPk(req.params.id)
            if (economy) {
                if (req.body.name) {
                    economy.name = req.body.name
                }
                if (req.body.description) {
                    economy.name = req.body.description
                }
                if (req.body.value) {
                    economy.value = req.body.value
                }
                await economy.save()
                res.status(200).json({ message: "updated" })
            } else {
                res.status(404).json({ message: "Economy not found" })
            }
        } catch (err) {
            console.warn(err)
            res.status(500).json({ message: err.message })
        }
    },

    deleteEconomy: async (req, res) => {
        try {
            let economy = await Economies.findByPk(req.params.id)
            if (economy) {
                await economy.destroy()
                res.status(200).json({ message: "deleted" })
            } else {
                res.status(404).json({ message: "Economy not found" })
            }
        } catch (err) {
            console.warn(err)
            res.status(500).json({ message: err.message })
        }
    }
}