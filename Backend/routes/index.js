const express = require('express')
const controladoresDeUsuarios = require('../controladores/controladoresDeUsuarios')
const controladoresDeComentarios = require('../controladores/controladoresDeComentarios')
const controladoresDePublicaciones = require('../controladores/controladoresDePublicaciones')
const validator = require ('../config/validador')
const passport = require ('passport')
require('../config/validador')
const router = express.Router()
<<<<<<< HEAD
<<<<<<< HEAD
// const controladoresDeResenias = require('../controladores/controladoresDeResenias')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
=======
>>>>>>> 95861d6cdc9545ad2ce393aa35a7950de8746bab
=======

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

>>>>>>> 8ce96ba1bd5e41e908babeddc96563077cac02a5

/*RUTAS USUARIOS*/
router.route('/usuarios')
.get(controladoresDeUsuarios.obtenerTodosLosUsuarios)

router.route('/usuarios/registrarse')
.post(controladoresDeUsuarios.registrarUsuario)
//controlador usuarios por id

router.route('/usuarios/:id')
.get(controladoresDeUsuarios.obtenerUnUsuario)
.delete(controladoresDeUsuarios.eliminarUnUsuario)
.put(controladoresDeUsuarios.editarUsuario)

router.route('/usuarios/registrarse')
.post(controladoresDeUsuarios.registrarUsuario)
router.route('/usuarios/iniciarSesion')
.post(controladoresDeUsuarios.iniciarSesion)

router.route('/usuarios/inicioForzado')
.post(controladoresDeUsuarios.inicioForzado)


// Reseñas | Publicaciones 
router.route('/publicaciones')
<<<<<<< HEAD
.get(controladoresDePublicaciones.todasLasPublicaciones)
<<<<<<< HEAD
.post(upload.single('image'),controladoresDePublicaciones.cargarPublicacion)
.delete(controladoresDePublicaciones.borrarPublicacion)
.put(controladoresDePublicaciones.editarPublicacion)
=======
.post(controladoresDePublicaciones.cargarPublicacion)
>>>>>>> 95861d6cdc9545ad2ce393aa35a7950de8746bab
=======
//.get(controladoresDePublicaciones.todasLasPublicaciones)
//.post(upload.single('image'),controladoresDePublicaciones.cargarPublicacion)
//.delete(controladoresDePublicaciones.borrarPublicacion)
//.put(controladoresDePublicaciones.editarPublicacion)

.get(controladoresDePublicaciones.todasLasPublicaciones) //anda
.post(controladoresDePublicaciones.cargarPublicacion) //anda

>>>>>>> 8ce96ba1bd5e41e908babeddc96563077cac02a5

router.route('/publicaciones/:id')

.delete(controladoresDePublicaciones.borrarPublicacion) //anda
.put(controladoresDePublicaciones.editarPublicacion) //anda

router.route('/publicaciones/:categoria')
.get(controladoresDePublicaciones.publicacionesCategoria) //anda

// Valoracion de la publicación (estrellas de calificacion)
router.route('/publicacionValorada/:id')
.post(controladoresDePublicaciones.cargarValoracion)


// Comentarios
router.route('/comentarios/:id')
.get(controladoresDeComentarios.obtenerComentario)
.post(controladoresDeComentarios.cargarNuevoComentario)
.delete(controladoresDeComentarios.borrarComentario)
.put(controladoresDeComentarios.editarComentario)

module.exports = router 

