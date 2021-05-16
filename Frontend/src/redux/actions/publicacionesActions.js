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

    obtenerUnaPublicacion: (idPublicacion)=>{
        return async(dispatch, getState)=>{
            const respuesta = await axios.get("http://localhost:4000/api/publicaciones/"+idPublicacion)
            return(respuesta.data.respuesta)
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
            const tokenUsuario = localStorage.getItem('token')
            const respuesta = await axios.post("http://localhost:4000/api/publicaciones",{...inputs},{
                headers: {
                    'Authorization': 'Bearer '+ tokenUsuario
                }
            })
        }
    },
    cargarValoracion: (idPublicacion, {idUsuario, valoracion})=>{
        return async(dispatch, getState) =>{
            const respuesta = await axios.post("http://localhost:4000/api/publicacionValorada/" + idPublicacion, {idUsuario, valoracion} )
            return respuesta.data.respuesta
        }
    },
    cargarLike: (idPublicacion, idUsuario)=>{
        return async(dispatch, getState) =>{
            const respuesta = await axios.post("http://localhost:4000/api//publicacionLikeada/" + idPublicacion, {idUsuario})
            return respuesta.data
        }
    },

    filtroPorPalabraClave: (valorDelFiltro)=>{
        return async(dispatch, getState)=>{
            dispatch({type: 'FILTRO_POR_PALABRA_CLAVE', payload: valorDelFiltro})
        }
    },
    cargarComentario: (idPublicacion, token, mensaje)=>{
        return async(dispatch, getState)=>{
            const respuesta = await axios.post('http://localhost:4000/api/comentarios/' + idPublicacion, {mensaje}, {
                headers: {
                    'Authorization': 'Bearer '+ token
                }
            })
            return respuesta.data.respuesta
        }
    },
    eliminarComentario: ()=>{
        return async(dispatch, getState)=>{
            
        }
    }

}
export default publicacionesActions