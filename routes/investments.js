const router = require('express').Router()
const { investmentsController } = require('../controllers')
router.get('', investmentsController.getAll)
router.post('', investmentsController.createInvestemt)
router.put('/:id', investmentsController.updateInvestment)
router.delete('/:id', investmentsController.deleteInvestment)

module.exports = router