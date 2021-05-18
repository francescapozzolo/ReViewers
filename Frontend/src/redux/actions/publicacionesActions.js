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
            // const respuesta = 
            await axios.post("http://localhost:4000/api/publicaciones",{...inputs},{
                headers: {
                    'Authorization': 'Bearer '+ tokenUsuario
                }
            })

        }
    },
    cargarValoracion: (idPublicacion, valoracion, token)=>{
        return async(dispatch, getState) =>{
            const respuesta = await axios.post("http://localhost:4000/api/publicacionValorada/" + idPublicacion, valoracion, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            // return respuesta.data.respuesta || La Respuesta no interesa, solo guardar la valoracion
        }
    }, 

    publicacionFueValorada: (idPublicacion, token)=>{
        return async(dispatch, getState)=>{
            const respuesta = await axios.get("http://localhost:4000/api/publicacion/fueValorada/"+idPublicacion  ,{
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            return respuesta.data
        }
    },
    guardarPublicacion: (idPublicacion, token)=>{
        return async(dispatch, getState) =>{
            const respuesta = await axios.get("http://localhost:4000/api/publicacion/guardarPublicacion/" + idPublicacion, {
                headers: {
                    'Authorization': 'Bearer '+token
                }
            })
            // return respuesta.data || Podría retornar la respuesta, pero no veo para que podria servir.
        }
    },
    publicacionFueGuardada: (idPublicacion, token)=>{
        return async(dispatch, getState) => {            

            const respuesta = await axios.get("http://localhost:4000/api/publicacion/fueGuardada/"+idPublicacion  ,{
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
           
            return respuesta
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
            dispatch({type: 'CARGAR_COMENTARIO', payload: respuesta.data.respuesta})
            return respuesta.data.respuesta
        }
    },
    editarComentario : (idComentario, idPublicacion, comentarioEditado)=>{
        return async(dispatch, getState)=>{
            const respuesta = await axios.put('http://localhost:4000/api/comentarios/'+ idPublicacion, {idComentario, comentarioEditado})
            return respuesta.data.respuesta
        }
    },
    eliminarComentario: ( idPublicacion, idComentario)=>{
        return async(dispatch, getState)=>{
            const respuesta = await axios.delete('http://localhost:4000/api/comentarios/' + idPublicacion, {
                data: {
                    idComentario: idComentario
                }
            })
            return respuesta.data.respuesta
        }
    }, 
    obtenerFavoritos: ()=>{
        return async(dispatch, getState)=>{
            const token = localStorage.getItem("token")
            console.log(token)

            const respuesta = await axios.get("http://localhost:4000/api/usuario/publicacionesGuardadas",{
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            return respuesta.data
        }
    },


}
export default publicacionesActions