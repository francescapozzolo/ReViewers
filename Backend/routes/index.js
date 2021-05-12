const express = require('express')
const router = express.Router()
const validator = require ('../config/validador')
const controladoresDeUsuarios = require('../controladores/controladoresDeUsuarios')
const controladoresDeResenias = require('../controladores/controladoresDeResenias')
const passport = require ('passport/lib')

/*RUTAS USUARIOS*/
router.route('/usuarios')
.get(controladoresDeUsuarios.obtenerTodosLosUsuarios)

router.route('/usuarios/registrarse')
.post(controladoresDeUsuarios.registrarUsuario)

router.route('/usuarios/:id')
.delete(controladoresDeUsuarios.eliminarUnUsuario)

router.route('usuarios/iniciarSesion')
.post(controladoresDeUsuarios.iniciarSesion)

router.route('usuarios/cerrarSesion')
// .post(controladoresDeUsuarios.cerrarSesion)

router.route('usuarios/inicioForzado')
.post(controladoresDeUsuarios.inicioForzado)


/*RUTAS RESENIAS*/


module.exports = router