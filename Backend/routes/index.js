const express = require('express')
const router = express.Router()
const validarRegistro = require('../config/validador')
const passport = require('passport')
const multer  = require('multer')


const controladoresDeUsuarios = require('../controladores/controladoresDeUsuarios')
const controladoresDeComentarios = require('../controladores/controladoresDeComentarios')
const controladoresDePublicaciones = require('../controladores/controladoresDePublicaciones')

const storage = multer.diskStorage({
    destination:'../Frontend/public/uploads',
    filename: (req, file, cb)=>{
        cb (null, file.originalname)
    }
})
const upload = multer({
    storage,
    dest: '../Frontend/public/uploads',
    limits:{fileSize:3000000},
    fileFilter: (req, file, cb)=>{
        const fileTypes = /jpeg|jpg|png/
        const mimetype = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(file.mimetype)
    }
}).single('imagen')

router.use(express.static('../Frontend/public'))



/*RUTAS USUARIOS*/
router.route('/usuarios')
.get(controladoresDeUsuarios.obtenerTodosLosUsuarios)

router.route('/usuarios/registrarse')
.post(validarRegistro, controladoresDeUsuarios.registrarUsuario)

//controlador usuarios por id
router.route('/usuarios/:id')
.get(controladoresDeUsuarios.obtenerUnUsuario)
.delete(controladoresDeUsuarios.eliminarUnUsuario)
.put(controladoresDeUsuarios.editarUsuario)


// DUPLICADO
// router.route('/usuarios/registrarse') 
// .post(validarRegistro, controladoresDeUsuarios.registrarUsuario)



router.route('/usuarios/iniciarSesion')
.post(controladoresDeUsuarios.iniciarSesion)

router.route('/usuarios/inicioForzado')
.post(controladoresDeUsuarios.inicioForzado)


// Reseñas | Publicaciones 
router.route('/publicaciones')
.get(controladoresDePublicaciones.todasLasPublicaciones) //anda
.post(upload,controladoresDePublicaciones.cargarPublicacion) //anda


router.route('/publicaciones/:id')
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
.post(controladoresDeComentarios.cargarNuevoComentario)
.delete(controladoresDeComentarios.borrarComentario)
.put(controladoresDeComentarios.editarComentario)

module.exports = router 

