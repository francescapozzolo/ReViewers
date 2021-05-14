import axios from 'axios'
const publicacionesActions={
    obtenerCategorias: ()=>{
        return (dispatch, getState)=>{

        }
    },
    obtenerSubCategorias:(categoria)=>{
        return (dispatch, getState)=>{

        }
    },
    enviarFormulario:(imagen, inputs)=>{
        return async(dispatch, getState)=>{
            await axios.post("http://localhost:4000/api/publicaciones",imagen, inputs)
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