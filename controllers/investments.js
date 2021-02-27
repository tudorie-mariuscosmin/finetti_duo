const { Investments } = require("../models")

module.exports = {
    getAll: async (req, res) => {
        try {
            const investments = await Investments.findAll({ where: { userId: req.user.id } })
            if (investments) {
                const data = investments.map(x => {
                    return {
                        id: x.id,
                        name: x.name,
                        description: x.description,
                        value: x.value,
                        expectedReturn: x.expectedReturn
                    }
                })
                res.status(200).json(data)
            }

        } catch (err) {
            console.warn(err)
            res.status(500).json({ message: err.message })
        }
    },
    createInvestemt: async (req, res) => {
        try {
            if (!req.body.name || !req.body.value || !req.body.expectedReturn) {
                res.status(400).json({ message: "Please enter all data" })
            } else {
                let investment = new Investments(req.body)
                investment.userId = req.user.id
                await investment.save()
                res.status(201).json({ message: "created" })
            }

        } catch (err) {
            console.warn(err)
            res.status(500).json({ message: err.message })
        }
    },

    updateInvestment: async (req, res) => {
        try {
            let investment = await Investments.findByPk(req.params.id)
            if (investment) {
                if (req.body.name) {
                    investment.name = req.body.name
                }
                if (req.body.description) {
                    investment.name = req.body.description
                }
                if (req.body.value) {
                    investment.value = req.body.value
                }
                if (req.body.expectedReturn) {
                    investment.expectedReturn = req.body.expectedReturn
                }
                await investment.save()
                res.status(200).json({ message: "updated" })
            } else {
                res.status(404).json({ message: "Economy not found" })
            }
        } catch (err) {
            console.warn(err)
            res.status(500).json({ message: err.message })
        }
    },

    deleteInvestment: async (req, res) => {
        try {
            let investment = await Investments.findByPk(req.params.id)
            if (investment) {
                await investment.destroy()
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