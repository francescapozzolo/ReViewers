const Usuario = require('../modelos/Usuario')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


const controladoresDeUsuario = {

   obtenerTodosLosUsuarios: async(req,res)=>{
      try{
         var todosLosUsuarios = await Usuario.find()
         res.json({success: true, respuesta: todosLosUsuarios})
      }catch(err){
         console.log('Caí en el catch del controlador ObtenerTodosLosUsuarios y el error es: '+ err)
         res.json({success: false, respuesta: "error: " + err})
      }
   },

   obtenerUnUsuario: async(req, res)=>{
      try{
         const id = req.params.id
         var todosLosUsuarios = await Usuario.find({_id: id})
         res.json({success: true, respuesta: todosLosUsuarios})
      }catch(err){
         console.log('Caí en el catch del controlador obtenerUnUsuario y el error es: '+ err)
         res.json({success: false, respuesta: "error: " + err})
      }
   },

   eliminarUnUsuario: async(req, res) => {
      try {
         const id = req.params.id
         await Usuario.findOneAndDelete({_id: id})
         var todosLosUsuarios = await Usuario.find()
         res.json({success: true, respuesta: todosLosUsuarios})
      } catch (err){
         console.log('Caí en el catch del controlador eliminarUnUsuario y el error es: '+err)
         res.json({success: false, respuesta: "error: " + err})
      }
   },

   editarUsuario: async(req,res) =>{
      try {
         const id = req.params.id
         var usuarioModificado = await Usuario.findOneAndUpdate({_id:id},{...req.body}, {new: true}) // el new true va xq sino no me devuelve el objeto modif.
         res.json({success: true, respuesta: usuarioModificado})
      } catch (err){
         console.log('Caí en el catch del controlador editarUsuario y el error es: ' + err)
         res.json({success: false, respuesta: "error: " + err})
      }
   },

   registrarUsuario: async(req, res)=>{
      try{
         const {nombre, apellido, mail, clave, intereses, rol, imagen, favoritos, seguidores} = req.body
         const mailExiste = await Usuario.findOne({mail}) //verifico que no esté registrado el mail que el usuario puso 
         
         var respuesta;
         var error;
         var usuarioARegistrar;
         
         const contraseniaHasheada = bcryptjs.hashSync(clave, 10)
         
         if(!mailExiste){
            try{
               usuarioARegistrar = new Usuario({nombre, apellido, mail, clave: contraseniaHasheada, imagen, intereses, rol, favoritos, seguidores})
               await usuarioARegistrar.save()
               const token = jwt.sign({...usuarioARegistrar}, process.env.SECRET_OR_KEY)            
               respuesta = {token, imagenDelUsuario: usuarioARegistrar.imagen, nombreDelUsuario: usuarioARegistrar.nombre} 
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
         console.log(mail)
   
         if(usuarioRegistrado){
            const contraseñaEsCorrecta = bcryptjs.compareSync(clave, usuarioRegistrado.clave)
            if(contraseñaEsCorrecta){
               const token = jwt.sign({...usuarioRegistrado}, process.env.SECRET_OR_KEY)
               respuesta = {token: token, imagen: usuarioRegistrado.imagen, nombre: usuarioRegistrado.nombre, idDelUsuario: usuarioRegistrado._id}
            } else {
               error = 'Mail o Contraseña incorrecta. Intenta de nuevo!'
            }
         } else {
            error = 'Mail no existe'
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

   inicioForzado: async()=>{
      try{
         res.json({success: true, respuesta: {imagen: req.user.imagen, nombre: req.user.nombre, userId: req.user._id}})
      }catch(err){
         res.json({success: false, respuesta: "error: " + err})
      }
   }
}

module.exports = controladoresDeUsuario