const alumnos = require('../../data/alumnos.json')
//const httpStatusCodes = require('http2').constants;

/*
const getAllAlumnos = (_, res) => {
    res.status(httpStatusCodes.HTTP_STATUS_OK).json(alumnos)
}  */

const getAllAlumnos = (req, res)=> {
    res.json(alumnos).status(200) 
}  

const getAlumnosByDni = (req, res) => {
    const dni = req.params.dni
    const alumno = alumnos.find (alumno => alumno.dni == dni)
    if (alumno){
        res.status(200).json(alumno).status(200)
    } else {
        res.status(404).json({ mensaje: `El alumno con dni ${dni} no fue encontrado`} )
    }
}
/*
const putAlumnos = (req, res) => { 
    const dni = req.params.dni;
    const { habilitado, celiaco, edad } = req.body;
    const alumno = alumnos.find(a => a.dni === dni);
    if (alumno) {
      alumno.habilitado = habilitado;
      alumno.celiaco = celiaco;
      alumno.edad = edad;
      res.json(alumno);
      //return res.status(200).json (
       // {mensaje: "Alumno modificado correctamente" });
    } else {
       res.status(404)
       .json(
             {resultado: "La operación de modicar no pudo ser realizada",
             mensaje: `El alumno con ese DNI ${dni} no fue encontrado`
             }
        )
    }
}; */


const putAlumnos = (req, res) => {
    const dni = req.params.dni;
    const { habilitado, celiaco, edad } = req.body;
    const alumno = alumnos.find((alumno) => alumno.dni === parseInt(dni));
    if (alumno) {
      if (habilitado !== undefined) {
        alumno.habilitado = habilitado;
      }
      if (celiaco !== undefined) {
        alumno.celiaco = celiaco;
      }
      if (edad !== undefined) {
        alumno.edad = edad;
      }
      res.json(alumno);
    } else {
      res.status(404).
        json({resultado: "La operación de modicar no pudo ser realizada",
             mensaje: `El alumno con ese DNI ${dni} no fue encontrado`
             }
            );
    }
  };  



const postAlumnos = (req, res) => {
    const { dni, nombre, habilitado = true, celiaco = false, edad } = req.body;
  
    // Validaciones
    if (!dni || dni.toString().length !== 8) {
      return res.status(400).json({ error: 'El DNI debe tener 8 dígitos' });
    }
    if (alumnos.find((alumno) => alumno.dni === dni)) {
      return res.status(400).json({ error: 'El alumno ya está registrado' });
    }
    if (!edad || edad <= 18 || edad >= 99) {
      return res
        .status(400)
        .json({ error: 'La edad debe ser mayor a 18 y menor a 99 años' });
    }
  
const alumno = {
    dni: parseInt(dni),
    nombre,
    habilitado,
    celiaco,
    edad,
};
alumnos.push(alumno);
  
res.json({ message: 'Alumno registrado correctamente', alumno });
};
  
const deleteAlumnosByDni= (req, res) => {
    const dni = req.params.dni
    const indice = alumnos.findIndex (alumno => alumno.dni == dni)
    if (indice==-1) {
       res.status(404).json
       ( {
          resultado :"El alumno no pudo ser eliminado ",
          mensaje: `EL alumno con ese DNI ${id} no fue encontrado`
       } 
      )
    } else {
       const alumno = alumnos[indice];
       resultado = alumnos.splice(indice,1)
       res.status(200).json( {resultado:"El alumno fue eliminado con exito",
                 alumno: alumno})
    }
}  

module.exports = {getAllAlumnos, getAlumnosByDni, putAlumnos, postAlumnos, deleteAlumnosByDni}

    