const express = require('express')
const pedidoControllers = require('../controllers/pedido.controller')


const router = express.Router();

router.get('/', pedidoControllers.getPedidos)   
router.get ('/:id', pedidoControllers.getPedidosByid)
router.get ('/search', pedidoControllers.getPedidossearch)
router.post( '/', pedidoControllers.postPedidos)
router.delete('/:id', pedidoControllers.deletePedidosByid)

module.exports = {router}