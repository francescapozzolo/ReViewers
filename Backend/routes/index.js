const express = require('express')
const controladoresDeUsuarios = require('../controladores/controladoresDeUsuarios')
const controladoresDeComentarios = require('../controladores/controladoresDeComentarios')
const controladoresDePublicaciones = require('../controladores/controladoresDePublicaciones')
const validator = require ('../config/validador')
const passport = require ('passport')
require('../config/validador')
const router = express.Router()
<<<<<<< HEAD
// const controladoresDeResenias = require('../controladores/controladoresDeResenias')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
=======
>>>>>>> 95861d6cdc9545ad2ce393aa35a7950de8746bab

/*RUTAS USUARIOS*/
router.route('/usuarios')
.get(controladoresDeUsuarios.obtenerTodosLosUsuarios)

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
.get(controladoresDePublicaciones.todasLasPublicaciones)
<<<<<<< HEAD
.post(upload.single('image'),controladoresDePublicaciones.cargarPublicacion)
.delete(controladoresDePublicaciones.borrarPublicacion)
.put(controladoresDePublicaciones.editarPublicacion)
=======
.post(controladoresDePublicaciones.cargarPublicacion)
>>>>>>> 95861d6cdc9545ad2ce393aa35a7950de8746bab

router.route('/publicaciones/:id')
.put(controladoresDePublicaciones.editarPublicacion)
.delete(controladoresDePublicaciones.borrarPublicacion)
.get(controladoresDePublicaciones.publicacionesCategoria)

// Valoracion de la publicación (estrellas de calificacion)
router.route('/publicacionValorada/:id')
.post(controladoresDePublicaciones.cargarValoracion)


// Comentarios
router.route('/comentarios/:id')
.get(controladoresDeComentarios.obtenerComentarios)
.post(controladoresDeComentarios.cargarNuevoComentario)
.delete(controladoresDeComentarios.borrarComentario)
.put(controladoresDeComentarios.editarComentario)


module.exports = router 

