const Usuario = require('../modelos/Usuario')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


const controladoresDeUsuario = {

   obtenerTodosLosUsuarios: async(req,res)=>{
      try{
         var todosLosUsuarios = await Usuario.find()
      }catch(err){
         console.log('Caí en el catch del controlador ObtenerTodosLosUsuarios y el error es: '+ err)
      }
      res.json({respuesta: todosLosUsuarios })
   },

   eliminarUnUsuario: async(req, res) => {
      try {
         const id = req.params.id
         await Usuario.findOneAndDelete({_id: id})
         var todosLosUsuarios = await Usuario.find()
      } catch (err){
         console.log('Caí en el catch del controlador eliminarUnUsuario y el error es: '+err)
      }
      res.json({respuesta: todosLosUsuarios})
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
               respuesta = {token: token, imagenDelUsuario: usuarioARegistrar.imagen, nombreDelUsuario: usuarioARegistrar.nombre} 
               // console.log('El usuario a registrar es: ' +  usuarioARegistrar)
            } catch (err){ //no pinta mostrar el error posta porque el usuario no lo va a entender 
               console.log('Caí en el catch del condicional del controlador de Registrar Usuario y el error es: '+ err)
               error = "Parece que algo salió mal tratando de registrar su cuenta. Por favor, intente de nuevo"
            }
         } else {
            error = 'Parece que tu mail ya está registrado.. Iniciá Sesion!'
         }
      } catch(err){
         console.log('Caí en el catch del controlador de registrar Usuario y el error es: '+err)
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
         var response;
         var error; 
   
         const accountRegistered = await User.findOne({mail})
   
         if(accountRegistered){
            const passwordMatches = bcryptjs.compareSync(clave, accountRegistered.clave)
            console.log('existe la cuenta')
            if(passwordMatches){
               console.log('contraseña correcta')
               const token = jwt.sign({...accountRegistered}, process.env.SECRET_OR_KEY)
               response = token
            } else {
               error = 'Mail o Contraseña incorrecta. Intenta de nuevo!'
            }
   
         } else {
            error = 'Mail or Password incorrect. Try again!'
         }
         res.json({
            success: !error ? true : false,
            response: !error && {token: response, image: accountRegistered.image, name: accountRegistered.name, userId: accountRegistered._id},
            error: error
         })
      } catch (err){
         console.log('Caí en el catch del controlador de iniciarSesion y el error es: '+ err)
      }
   },

   inicioForzado: async(req , res)=>{
      console.log(res)
   }
}

module.exports = controladoresDeUsuario