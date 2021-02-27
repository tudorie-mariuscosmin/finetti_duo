const { authController } = require('../controllers')

const router = require('express').Router()

router.post('/login', authController.login)
router.post('/register', authController.registerUSer)
router.get('/test', authController.middleware.authenticate, (req, res) => res.send(req.user))

module.exports = router