const pedidos = require('../../data/pedidos.json')
const httpStatusCodes = require('http2').constants;

const viandas = []; // Array de viandas disponibles
let idCounter = 1; // Contador para generar el ID de los pedidos

const getPedidos = (req, res)=> {
    res.status(httpStatusCodes.HTTP_STATUS_OK).json(pedidos)
}  

const getPedidosByid =(req, res) => {
    const id = parseInt(req.params.id);
    const pedido = pedidos.find((pedido) => pedido.id === id);
    if (pedido) {
      res.json(pedido);
    } else {
      res.status(httpStatusCodes.HTPP_STATUS_NOT_FOUND).json({ Mensaje: 'El Pedido no fue encontrado' });
    }
  };
  
const postPedidos = (req, res) => {
const { dni, tipo } = req.body;
    // Verificar si el alumno está habilitado
const alumno = { dni: 123456789, nombre: 'Nombre del Alumno', celiaco: false, edad: 18 }; 
    if (!alumno) {
      return res.status(400).json({ error: 'Alumno no encontrado' });
    }
    if (!alumno.habilitado) {
      return res.status(400).json({ error: 'El alumno no está habilitado para realizar un pedido' });
    }
    
// Verifica el tipo de vianda solicitado
const tiposPermitidos = ['TARTA', 'POLLO', 'PASTA', 'PIZZA', 'EMPANADAS'];
    if (!tiposPermitidos.includes(tipo)) {
      return res
        .status(400)
        .json({ error: 'Tipo de vianda incorrecto. Los tipos permitidos son: TARTA, POLLO, PASTA, PIZZA, EMPANADAS' });
    }

// Buscar una vianda que cumpla con las condiciones
const vianda = viandas.find((vianda) => vianda.tipo === tipo && vianda.aptoCeliaco === alumno.celiaco && vianda.stock > 0);
    if (!vianda) {
      return res.status(400).json({ error: 'No hay viandas disponibles que cumplan con las condiciones' });
    }
// Crear el pedido
const fecha = new Date().toISOString().slice(0, 10);
const pedido = {
      id: idCounter,
      fecha,
      alumno: {
        dni: alumno.dni,
        nombre: alumno.nombre,
        celiaco: alumno.celiaco,
        edad: alumno.edad
    },
      vianda: {
        codigo: vianda.codigo,
        tipo: vianda.tipo,
        aptoCeliaco: vianda.aptoCeliaco,
        descripcion: vianda.descripcion
    }
};
  
// Desminuye el stock de la vianda en 1 unidad
 vianda.stock--;

// Deshabilita al alumno
alumno.habilitado = false;
  
// Agregar el pedido al array de pedidos
    pedidos.push(pedido);
    idCounter++;
  
// Devolver el pedido creado
    res.json(pedido);
  };

// PUNTO BONUS
// Obtener el último pedido realizado por el nombre del alumno
const getUltimoPedidos = (req, res) => {
    const nombre = req.query.nombre;
    const pedido = pedidos
      .filter((pedido) => pedido.alumno.nombre === nombre)
      .sort((a, b) => b.id - a.id)[0];
  
    if (pedido) {
      res.json(pedido);
    } else {
      res.json({ message: 'No encontrado' });
    }
  };
  
  // Borrar un pedido por su ID
const deletePedidosByid = (req, res) => {
    const id = parseInt(req.params.id);
    const pedidoIndex = pedidos.findIndex((pedido) => pedido.id === id);
  
    if (pedidoIndex !== -1) {
      const pedido = pedidos[pedidoIndex];
  
      // Incrementar en una unidad el stock de la vianda
      const vianda = viandas.find((vianda) => vianda.codigo === pedido.vianda.codigo);
      vianda.stock++;
  
      // Habilitar al alumno
      const alumno = alumnos.find((alumno) => alumno.dni === pedido.alumno.dni);
      alumno.habilitado = true;
  
      // Eliminar el pedido
      pedidos.splice(pedidoIndex, 1);
  
      res.json({ message: 'Pedido borrado correctamente' });
    } else {
      res.status(404).json({ error: 'Pedido no encontrado' });
    }
  };
  
module.exports = {getPedidos, getPedidosByid, postPedidos, getUltimoPedidos, deletePedidosByid}