const express = require ('express');
//const alumnosRouter = require('./routes/alumno.route')
//const viandasRouter = require('./routes/vianda.route')
const app = express()   
const PORT = process.env.PORT || 3001;

app.use(express.json()) 
//app.use('/api/alumnos', alumnosRouter)
//app.use('/api/viandas', viandasRouter)

app.listen(PORT, () => {console.log(`App lista escuchada en el puerto ${PORT} `) }) 
