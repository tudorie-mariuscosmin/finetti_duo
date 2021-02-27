const { User } = require('../models')
const { jwtSecret } = require('../config/app.conf.json')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
    login: async (req, res) => {
        if (!req.body.email || !req.body.password)
            res.status(400).json({ message: "Enter credentials!" })
        else if (!req.body.email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim))
            res.status(400).json({ message: 'Invalid email' })
        else {
            try {
                const user = await User.findOne({ where: { email: req.body.email } })
                if (!user) {
                    res.status(404).json({ message: 'Incorect Email' })
                } else {
                    const match = await bcrypt.compare(req.body.password, user.password)
                    if (match) {
                        const token = jwt.sign(user.id, jwtSecret)
                        res.status(200).json({ token })
                    } else {
                        res.status(400).json({ message: 'Incorect Password' })
                    }
                }
            } catch (error) {
                res.status(500).json({ message: 'Server error' })
            }

        }

    },

    registerUSer: async (req, res) => {
        const errors = [];
        if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
            errors.push("Please complete all fields!");
        }
        if (!req.body.firstName.match(/^[A-Z]+[a-zA-Z]+$/)) {
            errors.push("Please enter a valid first name!")
        }
        if (!req.body.lastName.match(/^[A-Z]+[a-zA-Z]+$/)) {
            errors.push("Please enter a valid last name")
        }
        if (!req.body.email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim)) {
            errors.push("Please enter a valid email adress!")
        }

        if (errors.length > 0) {
            res.status(400).json(errors);
        } else {
            const user = await User.findOne({ where: { email: req.body.email } })
            if (user) {
                res.status(400).json('Email is already registred')
            } else {
                bcrypt.genSalt(5, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        const user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash,
                        })
                        user.save()
                            .then((s) => res.json("User registred succesfully"))
                            .catch(err => { console.error(err); res.status(500).json('An error occured') })
                    })
                })
            }
        }
    },
    middleware: {
        authenticate: async (req, res, next) => {
            const AuthorizationHeader = req.headers['authorization']
            const token = AuthorizationHeader && AuthorizationHeader.split(' ')[1]
            if (!token) res.sendStatus(401);
            else {
                try {
                    let data = await jwt.verify(token, jwtSecret)
                    if (data) {
                        const user = await User.findByPk(data)
                        if (user) {
                            req.user = user
                            next()
                        }
                    }

                } catch (err) {
                    if (err.name === 'JsonWebTokenError') {
                        console.warn(err)
                        res.status(403).json({ message: err.message })
                    } else {
                        console.warn(err)
                        res.status(500).json({ message: err.message })
                    }
                }

            }
        },
    }
}