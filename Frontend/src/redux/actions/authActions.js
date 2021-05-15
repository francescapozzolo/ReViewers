import axios from 'axios';


const authActions = {

    crearUsuario: (nuevoUsuario) => {
        return async(dispatch, getState) => {
            try {
                const respuesta = await axios.post('http://localhost:4000/api/usuarios/registrarse', nuevoUsuario)

                if(respuesta.data.success) {
                    dispatch({
                        type: 'INGRESO_USUARIO',
                        payload: respuesta.data.respuesta
                    })
                } else if(respuesta.data.error) { 
                    alert(respuesta.data.error)
                } else {
                    return respuesta.data.errores.details
                }
            } catch {
                alert("Error interno del servidor, intente en un momento")
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
            } catch {
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
            } catch {
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
            } catch {
                alert('Error interno del servidor, intente mas tarde')
            }
        }
    },

    confirmarUsuario: (rolUsuarioIntereses) => {
        return async(dispatch, getState) => {
            try {
                const respuesta = await axios.put('http://localhost:4000/api/confirmarUsuario', rolUsuarioIntereses, {
                    headers: {
                        'Authorization': 'Bearer '+ rolUsuarioIntereses.token
                    }
                }) 
                
                if(respuesta.data.usuarioConfirmado) {
                    return respuesta.data.usuarioConfirmado
                } else if(respuesta.data.error) {
                    alert(respuesta.data.error)
                }  
            } catch {
                alert('Error interno del servidor, intente mas tarde')
            }
        }
    }
}


export default authActions;