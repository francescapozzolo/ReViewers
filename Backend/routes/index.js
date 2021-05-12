const express = require('express')
const router = express.Router()

const controladorPublicaciones = require('../controladores/controladorPublicaciones')
const controladorComentarios = require('../controladores/controladorComentarios')
const validator = require ('../config/validador')
const passport = require('passport')
require('../config/passport')


const {todasLasPublicaciones , publicacionesCategoria , borrarPublicacion , editarPublicacion , cargarPublicacion} = controladorPublicaciones
const {nuevoComentario , borrarComentario , editarComentario , obtenerComentarios} = controladorComentarios
const { validador } = validator
//usuarios

router.route('/iniciarSesion')
.get()
router.route('/registrarse')
.post(validador , )
router.route('/inicioForzado')
.get(passport.authenticate('jwt',{session:false}),acaVaInicioForzado)

//publicaciones

router.route('/todasLasPublicaciones')
.get(todasLasPublicaciones)
router.route('/publicacionesCategoria')
.get(publicacionesCategoria)
router.route('/borrarPublicacion')
.delete(borrarPublicacion)
router.route('/editarPublicacion')
.post(editarPublicacion)
router.route('/cargarPublicacion')
.post(cargarPublicacion)


//comentarios

router.route('/nuevoComentario')
.post(passport.authenticate('jwt',{session:false}), nuevoComentario)
router.route('/borrarComentario')
.delete(passport.authenticate('jwt',{session:false}),borrarComentario)
router.route('/editarComentario')
.post(passport.authenticate('jwt',{session:false}),editarComentario)
router.route('/obtenerComentarios')
.get(obtenerComentarios)

module.exports = router