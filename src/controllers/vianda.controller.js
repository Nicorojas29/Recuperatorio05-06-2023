const viandas = require('../../data/viandas.json')
const httpStatusCodes = require('http2').constants;

const getViandas = (req, res)=> {
     res.status(httpStatusCodes.HTTP_STATUS_OK).json(viandas)
}  

const getViandasByCodigo = (req, res) => {
    const codigo = req.params.codigo;
    const vianda = viandas.find((vianda) => vianda.codigo === codigo);
    if (vianda) {
      res.json(vianda);
    } else {
      res.status(httpStatusCodes.HTPP_STATUS_NOT_FOUND).json({ Mensaje: 'Vianda no encontrada' });
    }
  };

const putViandas = (req, res) => {
    const codigo = req.params.codigo;
    const { aptoCeliaco, stock, descripcion } = req.body;
    const vianda = viandas.find((vianda) => vianda.codigo === codigo);
    if (vianda) {
      if (aptoCeliaco !== undefined) {
        vianda.aptoCeliaco = aptoCeliaco;
      }
      if (stock !== undefined) {
        vianda.stock = stock;
      }
      if (descripcion !== undefined) {
        vianda.descripcion = descripcion;
      }
      return res.status(httpStatusCodes.HTTP_STATUS_OK).json({ mensaje: 'La Vianda fue modificada correctamente' });
    } else {
      res.status(httpStatusCodes.HTPP_STATUS_NOT_FOUND).json 
          ({resultado: "La operación de modicar no pudo ser realizada",
          mensaje: `La Vianda con ese codigo ${codigo} no fue encontrado`
        }
       )
    }
  };

// Registrar una nueva vianda
const postViandas = (req, res) => {
    const { codigo, tipo, aptoCeliaco = false, stock, descripcion } = req.body;
    // Validaciones
    if (!codigo || codigo.length !== 5 || codigo.charAt(0) !== 'V') {
      return res
        .status(httpStatusCodes.HTPP_STATUS_BAD_REQUEST)
        .json({ error: 'El código de vianda debe tener 5 caracteres y comenzar con la letra "V"' });
    }
    if (viandas.find((vianda) => vianda.codigo === codigo)) {
      return res.status(httpStatusCodes.HTPP_STATUS_BAD_REQUEST).json({ error: 'La vianda ya está registrada' });
    }
    const tiposValidos = ['TARTA', 'POLLO', 'PASTA', 'PIZZA', 'EMPANADAS'];
    if (!tiposValidos.includes(tipo)) {
      return res.status(httpStatusCodes.HTPP_STATUS_BAD_REQUEST).json({ error: 'Tipo de vianda incorrecto' });
    }
    if (stock === undefined || stock < 0) {
      return res.status(httpStatusCodes.HTPP_STATUS_BAD_REQUEST).json({ error: 'El stock debe ser mayor o igual a 0' });
}
const vianda = {
    codigo,
    tipo,
    aptoCeliaco,
    stock,
    descripcion,
};
viandas.push(vianda);
  res.json({ message: 'La Vianda fue registrada correctamente', vianda });
};

module.exports = {getViandas, getViandasByCodigo, putViandas, postViandas}