const express = require('express')
const pedidoControllers = require('../controllers/pedido.controller')


const router = express.Router();

router.get('/', pedidoControllers.getPedidos)   
router.get ('/:id', pedidoControllers.getPedidosByid)
router.post( '/', pedidoControllers.postPedidos)


module.exports = {router}