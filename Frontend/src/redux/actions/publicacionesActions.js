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
    enviarFormulario:(inputs)=>{
        return async(dispatch, getState)=>{
            // const respuesta = await axios.post("http://localhost:4000/api/publicaciones",{inputs, imagen})
            // console.log(respuesta)
        }
    }
}
export default publicacionesActions