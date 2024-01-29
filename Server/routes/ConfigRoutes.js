const ConfigController = require('../controllers/ConfigController.js')

const router = require('express').Router()



router.post('/addConfig',ConfigController.addConfig)

router.get('/allConfig',ConfigController.getAllConfig)

router.get('/published',ConfigController.getPublishedConfig)




router.get('/:id',ConfigController.getOneConfig)

router.put('/:id',ConfigController.updateConfig)

router.delete('/:id',ConfigController.deleteConfig)

module.exports=router