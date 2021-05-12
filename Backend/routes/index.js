const express = require('express')
const router = express.Router()
const validator = require ('../config/validador')
const controladoresDeUsuarios = require('../controladores/controladoresDeUsuarios')
const passport = require ('passport/lib')

router.route('/usuarios')
.get(controladoresDeUsuarios.obtenerTodosLosUsuarios)

router.route('/usuarios/registrarse')
.post(controladoresDeUsuarios.registrarUsuario)

router.route('usuarios/iniciarSesion')
.post(controladoresDeUsuarios.iniciarSesion)

router.route('/usuarios/:id')
.delete(controladoresDeUsuarios.eliminarUnUsuario)

router.route('usuarios/cerrarSesion')
// .post(controladoresDeUsuarios.cerrarSesion)

router.route('usuarios/inicioForzado')
.post(controladoresDeUsuarios.inicioForzado)

module.exports = router