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
    enviarFormulario:(imagen, inputs)=>{
        return async(dispatch, getState)=>{
            await axios.post("http://localhost:4000/api/publicaciones",imagen, inputs)
        }
    }
}
export default publicacionesActions