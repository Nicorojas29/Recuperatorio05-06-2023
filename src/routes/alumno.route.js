const express = require('express')
const alumnoControllers = require('../controllers/alumno.controller')

const router = express.Router();

router.get('/', alumnoControllers.getAllAlumnos)   
router.get ('/:dni', alumnoControllers.getAlumnosByDni)
router.put('/:dni', alumnoControllers.putAlumnos)
router.post( '/', alumnoControllers.postAlumnos)
router.delete('/:dni', alumnoControllers.deleteAlumnosByDni);


module.exports = {router}
