import axios from 'axios'
const publicacionesActions={
    obtenerTodasPublicaciones: ()=>{
        return async(dispatch, getState)=>{
            try{
                const respuesta = await axios.get("http://localhost:4000/api/publicaciones")
                dispatch({
                    type: 'CARGAR_PUBLICACIONES',
                    payload: respuesta.data.respuesta
                })
                return respuesta.data.respuesta
            }
            catch(error){console.log(error)}
            
        } 
    },

    obtenerCategorias: ()=>{
        return (dispatch, getState)=>{

        }
    },
    obtenerSubCategorias:(categoria)=>{
        return (dispatch, getState)=>{

        }
    },
    enviarFormulario:(inputs)=>{
        return async(dispatch, getState)=>{
            // const respuesta = await axios.post("http://localhost:4000/api/publicaciones",{inputs, imagen})
            // console.log(respuesta)
        }
    },
    cargarValoracion: (idPublicacion, {idUsuario, valoracion})=>{
        return async(dispatch, getState) =>{
            const respuesta = await axios.post("http://localhost:4000/api/publicacionValorada/" + idPublicacion, {idUsuario, valoracion} )
            console.log(respuesta.data.respuesta)
            return respuesta.data.respuesta
        }
    },
    cargarLike: (idPublicacion, idUsuario)=>{
        return async(dispatch, getState) =>{
            const respuesta = await axios.post("http://localhost:4000/api//publicacionLikeada/" + idPublicacion, {idUsuario})
            console.log(respuesta.data)
            return respuesta.data
        }
    },
    cargarPublicaciones: ()=>{ //en realidad esta action hace un fetcheo a la bd, yo solo hago asi para cargar algo al state como si fuera una publi
        return async(dispatch, getState)=>{
            dispatch({type: 'CARGAR_PUBLICACIONES', payload: [
                {titulo: "1 Reseña ", id: 1, tags: ['deporte', 'ropa', 'pasto']},
                {titulo: "2 Reseña ", id: 2, tags: ['tecnologia', 'computadora', 'gaming']},
                {titulo: "3 Reseña ", id: 3, tags: ['love', 'instagood', 'photooftheday']},
                {titulo: "4 Reseña ", id: 4, tags: ['fashion', 'beautiful', 'happy']},
                {titulo: "5 Reseña ", id: 5, tags: ['cute', 'tbt', 'like4like']},
                {titulo: "6 Reseña ", id: 6, tags: ['followme', 'picoftheday', 'summer']},
                {titulo: "7 Reseña ", id: 7, tags: ['me', 'selfie', 'gaming']},
                {titulo: "8 Reseña ", id: 8, tags: ['art', 'instadaily', 'friends']},
                {titulo: "9 Reseña ", id: 9, tags: ['repost', 'nature', 'girl']},
                {titulo: "10 Reseña ", id: 10, tags: ['fun', 'style', 'smile', 'food']},
                {titulo: "11 Reseña ", id: 11, tags: ['fabuloso', 'active', 'amor']},
                {titulo: "12 Reseña ", id: 12, tags: ['adorable', 'picoftheday', 'buenosdías']},
                {titulo: "13 Reseña ", id: 13, tags: ['aniversario', 'tbt', 'art']},
                {titulo: "14 Reseña ", id: 14, tags: ['fit', 'familia', 'Like4like']},
                {titulo: "15 Reseña ", id: 15, tags: ['InstaTime', 'Smile', 'fotografía']},
                {titulo: "16 Reseña ", id: 16, tags: ['frasesdeamor', 'aesthetic', 'amigos']},
                {titulo: "17 Reseña ", id: 17, tags: ['me', 'selfie', 'gaming']},
                {titulo: "18 Reseña ", id: 18, tags: ['amo', 'instadaily', 'friends']},
                {titulo: "19 Reseña ", id: 19, tags: ['películas', 'nature', 'girl']},
                {titulo: "20 Reseña ", id: 20, tags: ['netflixandchill', 'sorteo', 'música', 'smile', 'food']},
             ]})
        }
    },
    filtroPorPalabraClave: (valorDelFiltro)=>{
        return async(dispatch, getState)=>{
            console.log(valorDelFiltro)
            dispatch({type: 'FILTRO_POR_PALABRA_CLAVE', payload: valorDelFiltro})
        }
    }

}
export default publicacionesActions