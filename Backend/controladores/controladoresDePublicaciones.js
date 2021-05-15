const Resenia = require('../modelos/Resenia')

//posible modificacion en los parametros de findOne , findOneAndDelete , findOneAndUpdate

const controladorPublicaciones = {
    publicacionPorID: async (req , res) => {
        try{
            const unicaPublicacion = await Resenia.findOne({_id: req.params.id})
            res.json({success: true , respuesta: unicaPublicacion})
        }catch(error){
            console.log("error en publicacionPorID" , error)
            res.json({success: false , respuesta: error})
        }
    },
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
        try{

            //version original
        //    const {categoria, subcategoria, titulo, subtitulo, descripcion, imagen, tags, pro, contra} = req.body
        //    const {_id} = req.user
        //    const reseniaSchemaAEnviar = {categoria,subcategoria, titulo, subtitulo, descripcion, imagen, autor:_id, tags, proContra:{ pro, contra} }
        //     const nuevaPublicacion = await new Resenia(reseniaSchemaAEnviar)
        //     // .save()
        //     // const todasLasPublicaciones = await Resenia.find()
        //     console.log({succes:true, respues:nuevaPublicacion})
        //     // res.json({success: true, respuesta: nuevaPublicacion})


        // cargar publicaciones desde postman
            const {categoria, subcategoria, titulo, subtitulo, descripcion, imagen, tags, pro, contra, autor} = req.body
            //    const {_id} = req.user
               const reseniaSchemaAEnviar = {categoria,subcategoria, titulo, subtitulo, descripcion, imagen, autor, tags, proContra:{ pro, contra} }
                
               const nuevaPublicacion = await new Resenia(reseniaSchemaAEnviar).save()
                // const todasLasPublicaciones = await Resenia.find()
                // console.log({succes:true, respues:nuevaPublicacion})
                res.json({success: true, respuesta: nuevaPublicacion})
    

        }catch(error){
            console.log("error cargar publicacion" , error)
            res.json({success: false, respuesta: error})
        }
    },

    cargarValoracion: async(req, res)=>{
        try{
            const idPublicacion = req.params.id
            const {idUsuario, valoracion} = req.body
            console.log('idPublicacion: ' + idPublicacion )
            console.log('idUsuario: ' + idUsuario )
            console.log('valoracion: ' + valoracion )
            var publicacionValorada = await Resenia.findOne({_id: idPublicacion})
            // console.log('publicacion valorada: '+ publicacionValorada)

            const valoracionExiste = publicacionValorada.valoraciones.find(element => JSON.stringify(element.idUsuario) == JSON.stringify(idUsuario)) //Me devuelve undefined :v
            console.log('Valoracion existe: ' + valoracionExiste)
            
            if(!valoracionExiste){
                publicacionValorada = await Resenia.findOneAndUpdate({_id: idPublicacion}, {$push: {valoraciones: {idUsuario, valoracion}}}, {new: true})
                res.json({success: true, respuesta: publicacionValorada})
            } else {
                console.log('Este usuario ya valoró, el id de la valoracion es: ' + valoracionExiste)
                publicacionValorada = await Resenia.findOneAndUpdate(
                    {_id: idPublicacion, "valoraciones._id": valoracionExiste._id},
                    {$set: {"valoraciones.$.valoracion": valoracion}}, //si vuelve a valorar, se reemplaza la valoracions
                    {new: true}
                )
                res.json({respuesta: {success:true, valoraciones: publicacionValorada.valoraciones}})
            }
        }catch(err){
            console.log('Caí en el catch de cargarValoracion y el error es: '+ err)
            res.json({success: false, error: 'error al valorar publicacion: ' + err})
        }
    }, 

    cargarLike: async(req,res)=>{
        try {
            const idPublicacion = req.params.id
            const idUsuario = req.body.idUsuario
            var usuarioYaLikio;
            

            const publicacionBuscada = await Resenia.findOne({_id: idPublicacion})
            
            if(publicacionBuscada.usuariosFav.indexOf(idUsuario) === -1){
                publicacionLikeada = await Resenia.findOneAndUpdate(
                    {_id: idPublicacion},
                    {$push: {usuariosFav: idUsuario}}, 
                    {new: true}
                ) 
                usuarioYaLikio = true
            }else {
                publicacionLikeada = await Resenia.findOneAndUpdate(
                    {_id: idPublicacion},
                    {$pull: {usuariosFav: idUsuario}}, 
                    {new: true}
                )
                usuarioYaLikio = false
            }
            res.json({success:true, usuarioYaLikio,  totalDeLikes: publicacionLikeada.usuariosFav.length})

            
        }catch (err){
            res.json({respuesta: 'Parece que algo salió mal :v', error: err})
        }
    }
}

module.exports = controladorPublicaciones