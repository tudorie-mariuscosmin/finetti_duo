const router = require('express').Router()
const { economiesController } = require('../controllers')


router.get('', economiesController.findAll)
router.post('', economiesController.createEconomy)
router.put('/:id', economiesController.updateEconomy)
router.delete('/:id', economiesController.deleteEconomy)
module.exports = router