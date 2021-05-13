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
    },

    cerrarSesion: () => {
        return(dispatch, getState) => {
            try {
                dispatch({
                    type: 'DESLOGUEO_USUARIO'
                })
            } catch (error) {
                alert('Error interno del servidor, intente mas tarde')
            }
        }
    },

    iniciarSesionLS: (ObjUsuarioLS) => {
        return async(dispatch, getState) => {
            try {
                const respuesta = await axios.get('http://localhost:4000/api/iniciarSesionLS', {
                    headers: {
                        'Authorization': 'Bearer '+ ObjUsuarioLS.token
                    }
                })
                dispatch({
                    type: 'INGRESO_USUARIO',
                    payload: {
                        ...respuesta.data.respuesta,
                        token: ObjUsuarioLS.token
                    }
                })
            } catch (error) {
                alert('Error interno del servidor, intente mas tarde')
            }
        }
    }
}


export default authActions;