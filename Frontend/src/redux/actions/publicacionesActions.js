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
            const respuesta = await axios.post("http://localhost:4000/api/publicaciones",{inputs})
            console.log(respuesta)
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
    }
}
export default publicacionesActions