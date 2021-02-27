const router = require('express').Router()
const { startupController } = require('../controllers')
const authRoutes = require('./auth')

router.get('/reset', startupController.resetDatabase)
router.use('/auth', authRoutes)

module.exports = router