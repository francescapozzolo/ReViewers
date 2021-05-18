const Resenia = require('../modelos/Resenia')
const Usuario = require('../modelos/Usuario')

//posible modificacion en los parametros de findOne , findOneAndDelete , findOneAndUpdate

const controladorPublicaciones = {
    publicacionPorID: async (req , res) => {
        try{
            const unicaPublicacion = await Resenia.findOne({_id: req.params.id})
            .populate({ path:"comentarios", populate:{ path:"usuarioId", select:{ "nombre":1 ,"apellido":1, "mail":1, "imagen":1 } } })

            res.json({success: true , respuesta: unicaPublicacion})
        }catch(error){
            //console.log("error en publicacionPorID" , error)
            res.json({success: false , respuesta: error})
        }
    },
    todasLasPublicaciones: async (req , res)=>{
        try{
            const todasPublicaciones = await Resenia.find()
            .populate({ path:"comentarios", populate:{ path:"usuarioId", select:{ "nombre":1 ,"apellido":1, "mail":1, "imagen":1 } } }).populate({ path:"autor", select:{ "nombre": 1,"apellido":1, "imagen":1}})
            res.json({success: true, respuesta: todasPublicaciones})
        }catch(error){
            //console.log("error controlador publicaciones" , error)
            res.json({success: false , respuesta: error})
        }
    },
    publicacionesCategoria: async (req , res)=>{
        try{
            const publicacionCategoria = await Resenia.findOne({categoria: req.params.categoria})
            .populate({ path:"comentarios", populate:{ path:"usuarioId", select:{ "nombre":1, "mail":1, "apellido":1,"imagen":1 } } })

            res.json({success: true , respuesta: publicacionCategoria})

        }catch(error){
            //console.log("error publicacion categoria" , error)
            res.json({success: false , respuesta: error})
        }
    },
    
    borrarPublicacion: async (req , res)=>{
        try{
            const publicacion = await Resenia.findOneAndDelete({_id: req.params.id})
            const todasLasPublicaciones = await Resenia.find()
            res.json({success: true, respuesta: todasLasPublicaciones})

        }catch(error){
            //console.log("error borrar publicacion" , error)
            res.json({success: false , respuesta: error})
        }
    },
    
    editarPublicacion: async (req , res)=>{
        try{
            const publicacion = await Resenia.findOneAndUpdate({_id: req.params.id} , {...req.body} , {new: true})
            res.json({success: true , respuesta: publicacion})
        }catch(error){
            //console.log("error modificar publicacion" , error)
            res.json({success: false , respuesta: error})
        }
    },

    cargarPublicacion: async (req , res)=>{
        try{

            // version original
           const {categoria, subcategoria, titulo, subtitulo, descripcion, imagen, tags, pro, contra} = req.body
           const {_id} = req.user
           const reseniaSchemaAEnviar = {categoria,subcategoria, titulo, subtitulo, descripcion, imagen, autor:_id, tags, proContra:{ pro, contra} }
            const nuevaPublicacion = await new Resenia(reseniaSchemaAEnviar).save()
            // const todasLasPublicaciones = await Resenia.find()
            //console.log({succes:true, respuesta:nuevaPublicacion})
            res.json({success: true, respuesta: nuevaPublicacion})


        // cargar publicaciones desde postman
            // const {categoria, subcategoria, titulo, subtitulo, descripcion, imagen, tags, pro, contra, autor} = req.body
            // //    const {_id} = req.user
            //    const reseniaSchemaAEnviar = {categoria,subcategoria, titulo, subtitulo, descripcion, imagen, autor, tags, proContra:{ pro, contra} }
                
            //    const nuevaPublicacion = await new Resenia(reseniaSchemaAEnviar).save()
            //     // const todasLasPublicaciones = await Resenia.find()
            //     // console.log({succes:true, respues:nuevaPublicacion})
            //     res.json({success: true, respuesta: nuevaPublicacion})
    


        // cargar publicaciones desde postman
            // const {categoria, subcategoria, titulo, subtitulo, descripcion, imagen, tags, pro, contra, autor} = req.body
            // //    const {_id} = req.user
            //    const reseniaSchemaAEnviar = {categoria,subcategoria, titulo, subtitulo, descripcion, imagen, autor, tags, proContra:{ pro, contra} }
                
            //    const nuevaPublicacion = await new Resenia(reseniaSchemaAEnviar).save()
            //     // const todasLasPublicaciones = await Resenia.find()
            //     // console.log({succes:true, respues:nuevaPublicacion})
                // res.json({success: true, respuesta: nuevaPublicacion})
    

        }catch(error){
            //console.log("error cargar publicacion" , error)
            res.json({success: false, respuesta: error})
        }
    },

    cargarValoracion: async(req, res)=>{
        try{
            const idPublicacion = req.params.id
            const {valoracion} = req.body
            const {_id} = req.user
            
            var publicacionValorada = await Resenia.findOne({_id: idPublicacion})

            const valoracionExiste = publicacionValorada.valoraciones.find(element => JSON.stringify(element.idUsuario) == JSON.stringify(_id))
            
            if(!valoracionExiste){
                publicacionValorada = await Resenia.findOneAndUpdate(
                    {_id: idPublicacion}, 
                    {$push: {valoraciones: {idUsuario: _id, valoracion}}}, 
                    {new: true}
                )

                res.json({success: true, respuesta: publicacionValorada})
            } else {
                publicacionValorada = await Resenia.findOneAndUpdate(
                    {_id: idPublicacion, "valoraciones._id": valoracionExiste._id},
                    {$set: {"valoraciones.$.valoracion": valoracion}}, //si vuelve a valorar, se reemplaza la valoracions
                    {new: true}
                )
                res.json({respuesta: {success:true, valoraciones: publicacionValorada.valoraciones}})
            }
        }catch(err){
            //console.log('Caí en el catch de cargarValoracion y el error es: '+ err)
            res.json({success: false, error: 'error al valorar publicacion: ' + err})
        }
    }, 

    publicacionFueValorada: async(req, res)=>{
        try {
            const idPublicacion = req.params.id
            const {_id} = req.user
            var usuarioYaValoro;


            const publicacionBuscada = await Resenia.findOne({_id: idPublicacion})
            // //console.log(JSON.stringify(publicacionBuscada.valoraciones[0].idUsuario) === JSON.stringify(_id))

            const usuarioYahabiaValorado = publicacionBuscada.valoraciones.find(elemento => {
               return JSON.stringify(elemento.idUsuario) === JSON.stringify(_id)}
            )

            if (usuarioYahabiaValorado){
                usuarioYaValoro = true
                res.json({success:true, usuarioYaValoro, valoracion: usuarioYahabiaValorado.valoracion})
            } else {
                usuarioYaValoro = false
                res.json({success:true, usuarioYaValoro})
            }

        }catch (err){
            //console.log(err)
            res.json({respuesta: 'Parece que algo salió mal :v', error: err})
        }
    },

    guardarPublicacion: async(req,res)=>{
        try {
            const idPublicacion = req.params.id
            const {_id} = req.user
            var usuarioYaGuardoPublicacion;
            
            const publicacionBuscada = await Resenia.findOne({_id: idPublicacion})
            const usuarioQueGuardo = await Usuario.findOne({_id: _id})
            //console.log(publicacionBuscada)


            if(publicacionBuscada.usuariosFav.indexOf(_id) === -1){
                publicacionGuardada = await Resenia.findOneAndUpdate(
                    {_id: idPublicacion},
                    {$push: {usuariosFav: _id}}, 
                    {new: true}
                ) 
                usuarioYaGuardoPublicacion = true
            }else {
                publicacionGuardada = await Resenia.findOneAndUpdate(
                    {_id: idPublicacion},
                    {$pull: {usuariosFav: _id}}, 
                    {new: true}
                )
                usuarioYaGuardoPublicacion = false
            }

            if(usuarioQueGuardo.favoritos.indexOf(publicacionBuscada._id) === -1){
                usuarioQueGuardoPublicacion = await Usuario.findOneAndUpdate(
                    {_id: _id},
                    {$push: {favoritos: publicacionBuscada._id}}, 
                    {new: true}
                ) 
            }else {
                usuarioQueGuardoPublicacion = await Usuario.findOneAndUpdate(
                    {_id: _id},
                    {$pull: {favoritos: publicacionBuscada._id}}, 
                    {new: true}
                )
            }

            res.json({success:true, usuarioYaGuardoPublicacion, totalDeFavs: publicacionGuardada.usuariosFav.length})
        }catch (err){
            res.json({respuesta: 'Parece que algo salió mal :v', error: err})
        }
    },
    
    publicacionFueGuardada: async(req, res)=>{
        try {
            const idPublicacion = req.params.id
            const {_id} = req.user
            var usuarioYaGuardoPublicacion;

            const publicacionBuscada = await Resenia.findOne({_id: idPublicacion})

            const usuarioYaGuardo = publicacionBuscada.usuariosFav.find(usuario => JSON.stringify(usuario._id) == JSON.stringify(_id))

            if (usuarioYaGuardo){
                usuarioYaGuardoPublicacion = true
            } else {
                usuarioYaGuardoPublicacion = false
            }

            res.json({success:true, usuarioYaGuardoPublicacion})
        }catch (err){
            //console.log(err)
            res.json({respuesta: 'Parece que algo salió mal :v', error: err})
        }
    },

    publicacionesGuardadas: async(req, res)=>{
        try {
            const {_id} = req.user 
            const usuarioLogeado = await Usuario.findOne({_id: _id})
            .populate("favoritos")

            res.json({success:true, publicacionesGuardadas: usuarioLogeado.favoritos})
        }catch (err){
            //console.log(err)
            res.json({respuesta: 'Parece que algo salió mal :v', error: err})
        }
    }
}

module.exports = controladorPublicaciones