const express = require('express')
const router = express.Router()
const validator = require ('../config/validador')
const controladoresDeUsuarios = require('../controladores/controladoresDeUsuarios')
const controladoresDeComentarios = require('../controladores/controladoresDeComentarios')
const controladoresDePublicaciones = require('../controladores/controladoresDePublicaciones')
const passport = require ('passport/lib')

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

// router.route('usuarios/cerrarSesion')
// .post(controladoresDeUsuarios.cerrarSesion)

router.route('/usuarios/inicioForzado')
.post(controladoresDeUsuarios.inicioForzado)


// Reseñas | Publicaciones 
router.route('/publicaciones')
.get(controladoresDePublicaciones.todasLasPublicaciones)
.post(controladoresDePublicaciones.cargarPublicacion)
.delete(controladoresDePublicaciones.borrarPublicacion)
.put(controladoresDePublicaciones.editarPublicacion)

router.route('/publicacion/:id')
.get(controladoresDePublicaciones.obtenenerUnaPublicacion)

router.route('/publicaciones/categoria/:id')
.get(controladoresDePublicaciones.publicacionesCategoria)

// Comentarios
router.route('/comentarios/:id') //Recibe el id de una publicacion
.get(controladoresDeComentarios.obtenerComentarios)
.post(controladoresDeComentarios.cargarNuevoComentario)
.delete(controladoresDeComentarios.borrarComentario)
.put(controladoresDeComentarios.editarComentario)

module.exports = router