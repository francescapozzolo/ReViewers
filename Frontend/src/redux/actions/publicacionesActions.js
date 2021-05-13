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
    enviarFormulario:(publicacion)=>{
        return async(dispatch, getState)=>{
            await axios.post("http://localhost:4000/api/publicaciones",publicacion)
        }
    }
}
export default publicacionesActions