const Resenia = require('../modelos/Resenia')

//posible modificacion en los parametros de findOne , findOneAndDelete , findOneAndUpdate

const controladorPublicaciones = {
    todasLasPublicaciones: async (req , res)=>{
        try{
            const todasPublicaciones = await Resenia.find()
            res.json({success: true, respuesta: todasPublicaciones})
        }catch(error){
            console.log("error controlador publicaciones" , error)
            res.json({success: false , respuesta: error})
        }
    },
    publicacionesCategoria: async (req , res)=>{
        try{

            const publicacionCategoria = await Resenia.findOne({categoria: req.params.categoria})
            res.json({success: true , respuesta: publicacionCategoria})

        }catch(error){
            console.log("error publicacion categoria" , error)
            res.json({success: false , respuesta: error})
        }
    },
    borrarPublicacion: async (req , res)=>{
        try{
            const publicacion = await Resenia.findOneAndDelete({_id: req.params.id})
            const todasLasPublicaciones = await Resenia.find()
            res.json({success: true, respuesta: todasLasPublicaciones})

        }catch(error){
            console.log("error borrar publicacion" , error)
            res.json({success: false , respuesta: error})
        }
    },
    
    editarPublicacion: async (req , res)=>{
        try{
            const publicacion = await Resenia.findOneAndUpdate({_id: req.params.id} , {...req.body} , {new: true})
            res.json({success: true , respuesta: publicacion})
        }catch(error){
            console.log("error modificar publicacion" , error)
            res.json({success: false , respuesta: error})
        }
    },

    cargarPublicacion: async (req , res)=>{
        console.log(req.body)
        try{
            console.log("entro")
            
            // console.log(req.file)
            // const {categoria, subcategoria, titulo, subtitulo, descripcion, imagen, autor, usuariosFav, valoraciones, tags, proContra, comentarios } = req.body
            // const resenia = Resenia({
            //     categoria,
            //     subcategoria,
            //     titulo,
            //     subtitulo,
            //     descripcion,
            //     imagen,
            //     autor,
            //     usuariosFav,
            //     valoraciones,
            //     tags,
            //     proContra,
            //     comentarios
            // })
            // if(req.file){
            //     console.log(req.file)
            //     const {filename} = req.file
            //     resenia.setImagen(filename)
            // }
            const nuevaPublicacion = new Resenia(req.body)
            await nuevaPublicacion.save()
            const todasLasPublicaciones = await Resenia.find()
            res.json({success: true, response: nuevaPublicacion})

            // const nuevaPublicacion = new Resenia(req.body)
            // await nuevaPublicacion.save()
            // const todasLasPublicaciones = await Resenia.find()
            res.json({success: true, respuesta: nuevaPublicacion})
        }catch(error){
            console.log("error cargar publicacion" , error)
            res.json({success: false, respuesta: error})
        }
    },

    cargarValoracion: async(req, res)=>{
        try{
            
        }catch(err){
        console.log('Caí en el catch de cargarValoracion y el error es: '+ err)
        res.json('error al valorar publicacion: ' + err)
        }
    }
}

module.exports = controladorPublicaciones