import { toast } from "react-toastify";
import axios from 'axios';
const toasts = (
    tipo,
    mensaje,
    position,
    autoClose,
    closeOnClick,
    pauseOnHover,
    draggable,
    toastId,
    closeButton
  ) => {
    toast[tipo](mensaje, {
      position,
      closeOnClick,
      pauseOnHover,
      draggable,
      toastId,
      closeButton,
      autoClose,
    });
  };

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
                    toasts('success',"Bienvenido!", 'top-center', 5000, true, true, true, 'InicioSesion',true)

                } else if(respuesta.data.error) { 
                    toasts('info',respuesta.data.error, 'top-center', 5000, true, true, true, 'errorCamposVacios',true)
                } else {
                    return respuesta.data.errores.details
                }
            } catch {
            toasts('info',"Error interno del servidor, intente en un momento", 'top-center', 5000, true, true, true, 'errorCamposVacios',true)
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
                    toasts('success',"Bienvenido!", 'top-center', 5000, true, true, true, 'InicioSesion',true)
                } else {
                    toasts('info',respuesta.data.error, 'top-center', 5000, true, true, true, 'errorCamposVacios',true)
                }
            } catch {
            toasts('info',"Error interno del servidor, intente en un momento", 'top-center', 5000, true, true, true, 'errorCamposVacios',true)
            }
        }
    },

    cerrarSesion: () => {
        return(dispatch, getState) => {
                dispatch({
                    type: 'DESLOGUEO_USUARIO'
                })
                toasts("warning","Hasta pronto!", 'top-center', 5000, true, true, true, 'CierreSesion',true)
            
        }
    },

    iniciarSesionLS: () => {
        return async(dispatch, getState) => {
            try {
                const token = localStorage.getItem('token')
                const respuesta = await axios.get('http://localhost:4000/api/iniciarSesionLS', {
                    headers: {
                        'Authorization': 'Bearer '+ token
                    }
                }) 
                if(respuesta.data.success){
                    dispatch({
                        type: 'INGRESO_USUARIO',
                        payload: {
                            ...respuesta.data.respuesta,
                            token
                        }
                    })  
                    toasts('success',"Bienvenido!", 'top-center', 5000, true, true, true, 'InicioSesion',true)

                }else{
                    dispatch({type:'DESLOGUEO_USUARIO'})
                    toasts('info',"Inicie sesión nuevamente, su sesión expiró.", 'top-center', 5000, true, true, true, 'errorCamposVacios',true)
                }
            } catch (error){
                dispatch({type:'DESLOGUEO_USUARIO'})
                toasts('error',"Inicie sesión nuevamente, su sesión expiró.", 'top-center', 5000, true, true, true, 'errorInicioLS',true)
                return true
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
                
                if(respuesta.data.usuario) {
                    dispatch({type:'INGRESO_USUARIO', payload:respuesta.data.usuario})
                } else if(respuesta.data.error) {
                    toasts('info',respuesta.data.error, 'top-center', 5000, true, true, true, 'errorCamposVacios',true)
                }  
            } catch {
            toasts('info',"Error interno del servidor, intente en un momento", 'top-center', 5000, true, true, true, 'errorCamposVacios',true)
            }
        }
    },
    actualizarDatosUsuario: (datos)=>{
        return async(dispatch, getState)=>{
            try{

                const token = localStorage.getItem('token')
                const respuesta = await axios.put('http://localhost:4000/api/usuarios/SeUsaToken',datos, {
                    headers: {
                        'Authorization': 'Bearer '+ token
                    }
                }) 
                if(respuesta.data.success){
                    dispatch({type:'INGRESO_USUARIO', payload:respuesta.data.respuesta})
                }else{
                    toasts('info',respuesta.data.error, 'top-center', 5000, true, true, true, 'errorCamposVacios',true)
                }
            }catch(e){
                toasts('info',"Error interno del servidor, intente en un momento", 'top-center', 5000, true, true, true, 'errorCamposVacios',true)
            }
            }
    }
}


export default authActions;