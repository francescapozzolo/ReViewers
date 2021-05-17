const Usuario = require('../modelos/Usuario')
const Resenia = require('../modelos/Resenia')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const controladoresDeComentarios = {
   obtenerComentario: async(req, res)=>{
      try {
         const idPublicacion = req.params.id
         console.log("soy params id" , req.params)
         var publicacionBuscada = await Resenia.findOne({_id: idPublicacion})
         console.log("soy publicacion buscada", publicacionBuscada)

         res.json({success: true, respuesta: publicacionBuscada.comentarios})

      }catch (err){
         console.log('caí en el catch del controlador de obtenerComentarios y el error es: ' + err)
         res.json({success: false, error: "Error: " + err})
      }
   },
   
   cargarNuevoComentario: async(req, res)=>{
      try {
         const idPublicacion = req.params.id
         var {mensaje} = req.body
         const {_id} = req.user

         var publicacionComentada = await Resenia.findOneAndUpdate(
            {_id: idPublicacion},
            {$push: {comentarios: {usuarioId: _id, mensaje}}}, 
            {new: true}
         ) 

         const reseniaAContestar = await Resenia.findOne({_id: idPublicacion})
         .populate({ path:"comentarios", populate:{ path:"usuarioId", select:{ "nombre":1, "mail":1 ,"apellido":1,"imagen":1 } } })

         console.log(reseniaAContestar)
         // const usuarioQueComento = await Usuario.findOne({_id: _id})
         // console.log(usuarioQueComento)
         
         res.json({success: true, respuesta: reseniaAContestar})
      } catch (err) {
         console.log('Caí en el catch del controlador cargarNuevoComentario y el error es: '+err)
         res.json({success: false, error: "Error: " + err})
      }
   },
   
   borrarComentario: async(req, res)=>{
      try {
         const idPublicacion = req.params.id
         const idComentario = req.body.idComentario
         console.log(req)
         console.log(idPublicacion)
         console.log(idComentario)

         var publicacionModificada = await Resenia.findOneAndUpdate(
            {_id: idPublicacion},
            {$pull: {comentarios: {_id: idComentario}}},
            {new: true}
         )
         .populate({ path:"comentarios", populate:{ path:"usuarioId", select:{ "nombre":1, "mail":1, "apellido":1,"imagen":1 } } })

         res.json({success: true, respuesta: publicacionModificada.comentarios})
      }catch (err){
         console.log('Caí en el catch del controlador de borrarComentario y el error es: ' + err)
         res.json({success: false, error: "Error: " + err})
      }
   },
   
   editarComentario: async(req, res)=>{
      try {
         console.log('entré al controlador de editar comentario')
         const idPublicacion = req.params.id
         const idComentario = req.body.idComentario
         const comentarioEditado = req.body.comentarioEditado
         console.log(idPublicacion)
         console.log(idComentario)
         console.log(comentarioEditado)

         const publicacionEncontrada = await Resenia.findOne({_id: idPublicacion})
         // console.log(publicacionEncontrada)

         var publicacionModificada = await Resenia.findOneAndUpdate( 
            {_id: idPublicacion, "comentarios._id": idComentario},  
            {$set: {"comentarios.$.mensaje": comentarioEditado}},            
            {new: true}
         )
         .populate({ path:"comentarios", populate:{ path:"usuarioId", select:{ "nombre":1, "mail":1, "apellido":1,"imagen":1 } } })

         
         res.json({success: true, respuesta: publicacionModificada.comentarios})
      }catch (err){
         console.log('Caí en el catch del controlador de editarComentario y el error es: '+ err)
         res.json({success: false, error: "Error: " + err})
      }

   },
}

module.exports = controladoresDeComentarios