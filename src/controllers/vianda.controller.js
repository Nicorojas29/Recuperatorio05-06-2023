const viandas = require('../../data/viandas.json')
const httpStatusCodes = require('http2').constants;

const getViandas = (_, res) => {
    res.status(httpStatusCodes.HTTP_STATUS_OK).json(viandas)
}

module.exports = {getViandas}