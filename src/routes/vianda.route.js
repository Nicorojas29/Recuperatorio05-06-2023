const express = require('express')
const viandaControllers = require('../controllers/vianda.controller')

const router = express.Router();

router.get('/', viandaControllers.getViandas)   
router.get ('/:codigo', viandaControllers.getViandasByCodigo)
router.post( '/', viandaControllers.postViandas)
router.put('/:codigo', viandaControllers.putViandas)


module.exports = {router}
