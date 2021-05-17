const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Usuario = require('../modelos/Usuario')

const controladoresDeUsuario = {

   obtenerTodosLosUsuarios: async(req, res)=>{
      try{
         const todosLosUsuarios = await Usuario.find()
         res.json({success: true, respuesta: todosLosUsuarios})
      }catch(err){
         console.log('Caí en el catch del controlador ObtenerTodosLosUsuarios y el error es: '+ err)
         res.json({success: false, respuesta: "error: " + err})
      }
   },

   obtenerUnUsuario: async(req, res)=>{
      try{
         const idUsuario = req.params.id
         const todosLosUsuarios = await Usuario.find({_id: idUsuario})
         res.json({success: true, respuesta: todosLosUsuarios})
      }catch(err){
         console.log('Caí en el catch del controlador obtenerUnUsuario y el error es: '+ err)
         res.json({success: false, respuesta: "error: " + err})
      }
   },

   eliminarUnUsuario: async(req, res) => {
      try {
         const idUsuario = req.params.id
         await Usuario.findOneAndDelete({_id: idUsuario})
         const todosLosUsuarios = await Usuario.find()
         res.json({success: true, respuesta: todosLosUsuarios})
      } catch (err){
         console.log('Caí en el catch del controlador eliminarUnUsuario y el error es: '+err)
         res.json({success: false, respuesta: "error: " + err})
      }
   },

   editarUsuario: async(req,res) =>{
      let usuario = req.user
      let error;
      let datos;
      let {nombre, apellido, mail, clave, claveNueva, imagen, intereses, rol} = req.body
      try {
         nombre !== "" && nombre !== usuario.nombre ? nombre = nombre : nombre = usuario.nombre
         apellido !== "" && apellido !== usuario.apellido ? apellido = apellido : apellido = usuario.apellido
         mail !== "" && mail !== usuario.mail ? mail = mail : mail = usuario.mail
         imagen !== "" && imagen !== usuario.imagen ? imagen = imagen : imagen = usuario.imagen
         rol !== "" && rol !== usuario.rol ? rol = rol : rol = usuario.rol
         
         if(clave && claveNueva){
            const contraseña = bcryptjs.compareSync(clave, usuario.clave)
            if(contraseña){
               clave = bcryptjs.hashSync(claveNueva, 10)
            }else{   
               error="Error contraseña erronea."   
            }
            datos = {nombre, apellido, mail, imagen, intereses, rol}
         }else{
            datos = {nombre, apellido, mail, imagen, intereses, rol, clave:usuario.clave}
         }

         const usuarioAEditar = await Usuario.findOneAndUpdate({_id:usuario._id},datos,{new:true})
         
         const token = jwt.sign({...usuarioAEditar},process.env.SECRET_OR_KEY)
         respuesta = {token, imagen: usuarioAEditar.imagen, nombre: usuarioAEditar.nombre, usuarioConfirmado: usuarioAEditar.usuarioConfirmado, rol: usuarioAEditar.rol, intereses: usuarioAEditar.intereses}

         res.json({
            success: !error ? true : false,
            respuesta,
            error
         })
        
      } catch {
         error = "Error interno del servidor, intente mas tarde"
         res.json({
            success: false,
            error
         })
         
      }
   },

   registrarUsuario: async(req, res)=>{
      try{
         let {mail, clave} = req.body
         const mailExiste = await Usuario.findOne({mail}) //verifico que no esté registrado el mail que el usuario puso 
         
         var respuesta;
         var error;
         var usuarioARegistrar;
         
         clave = bcryptjs.hashSync(clave, 10)
         
         if(!mailExiste){
            try{
               usuarioARegistrar = new Usuario({...req.body, clave})
               await usuarioARegistrar.save()
               const token = jwt.sign({...usuarioARegistrar}, process.env.SECRET_OR_KEY)            
               respuesta = {token, imagen: usuarioARegistrar.imagen, mail: usuarioARegistrar.mail, nombre: usuarioARegistrar.nombre, usuarioConfirmado: usuarioARegistrar.usuarioConfirmado, rol: usuarioARegistrar.rol, intereses: usuarioARegistrar.intereses}
            } catch (err){ //no pinta mostrar el error posta porque el usuario no lo va a entender 
               console.log('Caí en el catch del condicional del controlador de Registrar Usuario y el error es: '+ err)
               error = "Parece que algo salió mal tratando de registrar su cuenta. Por favor, intente de nuevo"
            }
         } else {
            error = 'Parece que tu mail ya está registrado.. Iniciá Sesion!'
         }
      } catch(err){
         console.log('Caí en el catch del controlador de registrar Usuario y el error es: '+err)
         error = err
      }
         
      // Si está todo bien, error es null, si algo falló entonces respuesta es null xD 
      res.json({
         success: !error ? true : false, 
         respuesta,
         error
      })  
   },

   iniciarSesion: async(req, res)=>{
      try {
         const {mail, clave} = req.body   
         var respuesta;
         var error; 
         
         const usuarioRegistrado = await Usuario.findOne({mail})
   
         if(usuarioRegistrado){
            const contraseñaEsCorrecta = bcryptjs.compareSync(clave, usuarioRegistrado.clave)
            if(contraseñaEsCorrecta){
               const token = jwt.sign({...usuarioRegistrado}, process.env.SECRET_OR_KEY)
               respuesta = {token, imagen: usuarioRegistrado.imagen, mail: usuarioRegistrado.mail, nombre: usuarioRegistrado.nombre, usuarioConfirmado: usuarioRegistrado.usuarioConfirmado, rol: usuarioRegistrado.rol, idUsuario: usuarioRegistrado._id, intereses: usuarioRegistrado.intereses}
            } else {
               error = 'Mail o clave incorrectos'
            }
         } else {
            error = 'Mail o clave incorrectos'
         }
         res.json({
            success: !error ? true : false,
            respuesta,
            error
         })
      } catch (err){
         console.log('Caí en el catch del controlador de iniciarSesion y el error es: ' + err)
         res.json({success: false, respuesta: "error: " + err})
      }
   },

   inicioForzado: (req, res) => {
         res.json({
            success: true,
            respuesta: {imagen: req.user.imagen, nombre: req.user.nombre, mail: req.user.mail, usuarioConfirmado: req.user.usuarioConfirmado, rol: req.user.rol, intereses: req.user.intereses}
         })
     
   },

   confirmarUsuario: async (req, res) => {
      let usuarioId = req.user._id
      let error;
      let usuarioConfirmado;
      
      try {
         const actualizarInfo = {
            usuarioConfirmado: req.body.usuarioConfirmado,
            intereses: req.body.intereses,
            rol: req.body.rol
         }
         const usuario = await Usuario.findOneAndUpdate({_id: usuarioId}, {...actualizarInfo}, {new: true})
         
         if(usuario.usuarioConfirmado) {
            usuarioConfirmado = true   
         } else {
            error = "Usuario no encontrado en la base de datos"
            usuarioConfirmado = false
         }
         res.json({
            success: !error ? true : false,
            usuario,
            error
         })
      } catch {
         error = "Error interno del servidor, intente mas tarde"
      }

      
   }
   
}

module.exports = controladoresDeUsuario