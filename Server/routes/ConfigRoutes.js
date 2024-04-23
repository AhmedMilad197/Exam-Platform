const ConfigController = require('../controllers/ConfigController.js')

const router = require('express').Router()

router.post('/login',ConfigController.login)

module.exports=router