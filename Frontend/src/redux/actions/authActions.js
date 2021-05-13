import axios from 'axios';


const authActions = {

    crearUsuario: (nuevoUsuario) => {
        return async(dispatch, getState) => {
            try {
                const respuesta = await axios.post('http://localhost:4000/api/usuarios/registrarse', nuevoUsuario)
                
                if(respuesta.data.errores.details) {
                    return respuesta.data.errores.details
                } else if(!respuesta.data.sucess) { 
                    alert(respuesta.data.error)
                } else {
                    dispatch({
                        type: 'INGRESO_USUARIO',
                        payload: respuesta.data.respuesta
                    })
                }
            } catch (error) {
                error = "Error en action de crear usuario"
            }
        }
    },

    iniciarSesion: (usuario) => {
        return async(dispatch, getState) => {
            console.log(usuario)
            try {
                const respuesta = await axios.post('http://localhost:4000/api/usuarios/iniciarSesion', usuario)
                if(respuesta.data.success) {
                    dispatch({
                        type: 'INGRESO_USUARIO',
                        payload: respuesta.data.respuesta
                    })
                } else {
                    alert(respuesta.data.error)
                }
            } catch (error) {
                alert("Error interno del servidor, intente en un momento")
            }
        }
    }
}


export default authActions;