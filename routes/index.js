const router = require('express').Router()
const { startupController, authController } = require('../controllers')
const authRoutes = require('./auth')
const economiesRoutes = require('./economies')

router.get('/reset', startupController.resetDatabase)
router.use('/auth', authRoutes)
router.use('/economies', authController.middleware.authenticate, economiesRoutes)

module.exports = router