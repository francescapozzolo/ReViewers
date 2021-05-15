const express = require('express')
const router = express.Router()
const validarRegistro = require('../config/validador')
const passport = require('passport')

const controladoresDeUsuarios = require('../controladores/controladoresDeUsuarios')
const controladoresDeComentarios = require('../controladores/controladoresDeComentarios')
const controladoresDePublicaciones = require('../controladores/controladoresDePublicaciones')
const { session } = require('passport')



/*RUTAS USUARIOS*/
router.route('/usuarios')
.get(controladoresDeUsuarios.obtenerTodosLosUsuarios)

router.route('/usuarios/registrarse')
.post(validarRegistro, controladoresDeUsuarios.registrarUsuario )

//controlador usuarios por id
router.route('/usuarios/:id')
.get(controladoresDeUsuarios.obtenerUnUsuario)
.delete(controladoresDeUsuarios.eliminarUnUsuario)
.put(controladoresDeUsuarios.editarUsuario)


router.route('/usuarios/iniciarSesion')
.post(controladoresDeUsuarios.iniciarSesion)

router.route('/iniciarSesionLS')
.get(passport.authenticate('jwt', {session: false}), controladoresDeUsuarios.inicioForzado)


// Reseñas | Publicaciones 
router.route('/publicaciones')
.get(controladoresDePublicaciones.todasLasPublicaciones) //anda
.post(passport.authenticate('jwt',{session:false}),controladoresDePublicaciones.cargarPublicacion) //anda


router.route('/publicaciones/:id')
.get(controladoresDePublicaciones.publicacionPorID)
.delete(controladoresDePublicaciones.borrarPublicacion) //anda
.put(controladoresDePublicaciones.editarPublicacion) //anda

router.route('/publicaciones/:categoria')
.get(controladoresDePublicaciones.publicacionesCategoria) //anda


// Valoracion (estrellas) | Likes
router.route('/publicacionValorada/:id')
.post(controladoresDePublicaciones.cargarValoracion)

router.route('/publicacionLikeada/:id')
.post(controladoresDePublicaciones.cargarLike)


// Comentarios 
router.route('/comentarios/:id')
.get(controladoresDeComentarios.obtenerComentario)
.post( passport.authenticate('jwt', {session:false}), controladoresDeComentarios.cargarNuevoComentario)
.delete(controladoresDeComentarios.borrarComentario)
.put(controladoresDeComentarios.editarComentario)

module.exports = router 

