const Usuario = require('../modelos/Usuario')
const Resenia = require('../modelos/Resenia')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const controladoresDeComentarios = {
   obtenerComentario: async(req, res)=>{
      try {
         const idDePublicacion = req.params.id
         console.log("soy params id" , req.params)
         var publicacionBuscada = await Resenia.findOne({_id: idDePublicacion})
         console.log("soy publicacion buscada", publicacionBuscada)

         res.json({success: true, respuesta: publicacionBuscada.comentarios})

      }catch (err){
         console.log('caí en el catch del controlador de obtenerComentarios y el error es: ' + err)
         res.json({success: false, error: "Error: " + err})
      }
   },
   
   cargarNuevoComentario: async(req, res)=>{
      try {
         const idDePublicacion = req.params.id
         var {usuarioId, mensaje} = req.body
         var publicacionComentada = await Resenia.findOneAndUpdate(
            {_id: idDePublicacion},
            {$push: {comentarios: {usuarioId, mensaje}}}, 
            {new: true}
         ) 
         res.json({success: true, respuesta: {publicacionComentada: publicacionComentada.comentarios}})
      } catch (err) {
         console.log('Caí en el catch del controlador cargarNuevoComentario y el error es: '+err)
         res.json({success: false, error: "Error: " + err})
      }
   },
   
   borrarComentario: async(req, res)=>{
      try {
         const idPublicacion = req.params.id
         const idComentario = req.body.idComentario
         var publicacionModificada = await Resenia.findOneAndUpdate(
            {_id: idPublicacion},
            {$pull: {comentarios: {_id: idComentario}}},
            {new: true}
         )

         res.json({success: true, respuesta: publicacionModificada.comentarios})
      }catch (err){
         console.log('Caí en el catch del controlador de borrarComentario y el error es: ' + err)
         res.json({success: false, error: "Error: " + err})
      }
   },
   
   editarComentario: async(req, res)=>{
      try {
         const idPublicacion = req.params.id
         const idComentario = req.body.idComentario
         const comentarioEditado = req.body.comentarioEditado
         console.log(idPublicacion)
         console.log(idComentario)
         console.log(comentarioEditado)

         const publicacionEncontrada = await Resenia.findOne({_id: idPublicacion})
         console.log(publicacionEncontrada)

         var publicacionModificada = await Resenia.findOneAndUpdate( 
            {_id: idPublicacion, "comentarios._id": idComentario},  
            {$set: {"comentarios.$.mensaje": comentarioEditado}},            
            {new: true}
         )
         
         res.json({success: true, respuesta: publicacionModificada.comentarios})
      }catch (err){
         console.log('Caí en el catch del controlador de editarComentario y el error es: '+ err)
         res.json({success: false, error: "Error: " + err})
      }

   },
}

module.exports = controladoresDeComentarios