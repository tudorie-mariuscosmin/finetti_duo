const router = require('express').Router()
const { startupController, authController } = require('../controllers')
const authRoutes = require('./auth')
const economiesRoutes = require('./economies')
const investmentsRoutes = require('./investments')

router.get('/reset', startupController.resetDatabase)
router.use('/auth', authRoutes)
router.use('/economies', authController.middleware.authenticate, economiesRoutes)
router.use('/investments', authController.middleware.authenticate, investmentsRoutes)

module.exports = router