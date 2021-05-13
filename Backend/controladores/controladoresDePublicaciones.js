const Resenia = require('../modelos/Resenia')

//posible modificacion en los parametros de findOne , findOneAndDelete , findOneAndUpdate

const controladorPublicaciones = {
   todasLasPublicaciones: async (req , res)=>{
      try{
         const todasPublicaciones = await Resenia.find()
         res.json({success: true , response: todasPublicaciones})
      }catch(error){
         console.log("error controlador publicaciones" , error)
         res.json({success: false , response: error})
      }
   },
    publicacionesCategoria: async (req , res)=>{
        try{
            const publicacionCategoria = await Resenia.findOne({categoria: req.params.categoria})
            res.json({success: true , response: publicacionCategoria})
        }catch(error){
            console.log("error publicacion categoria" , error)
            res.json({success: false , response: error})
        }
    },
    borrarPublicacion: async (req , res)=>{
        try{
            const publicacion = await Resenia.findOneAndDelete({_id: req.params.id})
            res.json({success: true , response: publicacion})
        }catch(error){
            console.log("error borrar publicacion" , error)
            res.json({success: false , response: error})
        }
    },
    
    editarPublicacion: async (req , res)=>{
        try{
            const publicacion = await Resenia.findOneAndUpdate({_id: req.params.id} , {...req.body} , {new: true})
            res.json({success: true , response: publicacion})
        }catch(error){
            console.log("error modificar publicacion" , error)
            res.json({success: false , response: error})
        }
    },

    cargarPublicacion: async (req , res)=>{
        try{
            const nuevaPublicacion = new Resenia(req.body)
            await nuevaPublicacion.save()
            // const todasLasPublicaciones = await Resenia.find()
            res.json({success: true, response: nuevaPublicacion})
        }catch(error){
            console.log("error cargar publicacion" , error)
            res.json({success: false, respuesta: error})
        }
    }
}

module.exports = controladorPublicaciones