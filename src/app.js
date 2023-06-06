const express = require ('express');
const app = express()   
const PORT = process.env.PORT || 3001;

const alumnoRouter = require ('./routes/alumno.route')
const viandaRouter = require ('./routes/vianda.route')
const pedidosRouter = require('./routes/pedido.route');

app.use(express.json()) 
app.use('/api/alumnos', alumnoRouter.router)
app.use('/api/viandas', viandaRouter.router)
app.use('/api/pedidos', pedidosRouter.router)

app.listen(PORT, () => {console.log(`App lista escuchada en el puerto ${PORT} `) })