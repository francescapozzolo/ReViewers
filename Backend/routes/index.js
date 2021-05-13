const express = require('express')
const controladoresDeUsuarios = require('../controladores/controladoresDeUsuarios')
//const controladoresDeComentarios = require('../controladores/controladoresDeComentarios')
const controladoresDePublicaciones = require('../controladores/controladoresDePublicaciones')
const validator = require ('../config/validador')
const passport = require ('passport')
require('../config/validador')
const router = express.Router()
// const controladoresDeResenias = require('../controladores/controladoresDeResenias')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

/*RUTAS USUARIOS*/
router.route('/usuarios')
.get(controladoresDeUsuarios.obtenerTodosLosUsuarios)

/*
router.route('/usuarios/registrarse')
.post(controladoresDeUsuarios.registrarUsuario)
router.route('/usuarios/:id')
//.get(controladoresDeUsuarios.obtenerUnUsuario)
.delete(controladoresDeUsuarios.eliminarUnUsuario)
.put(controladoresDeUsuarios.editarUsuario)*/

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
.post(upload.single('image'),controladoresDePublicaciones.cargarPublicacion)
.delete(controladoresDePublicaciones.borrarPublicacion)
.put(controladoresDePublicaciones.editarPublicacion)

router.route('/publicaciones/:id')
.get(controladoresDePublicaciones.publicacionesCategoria)

/*
// Comentarios
router.route('/comentarios')
.get(controladoresDeComentarios.obtenerComentarios)
.post(controladoresDeComentarios.cargarNuevoComentario)
.delete(controladoresDeComentarios.borrarComentario)
.put(controladoresDeComentarios.editarComentario)*/

module.exports = router 

