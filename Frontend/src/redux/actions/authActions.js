import axios from 'axios';


const authActions = {

    crearUsuario: (nuevoUsuario) => {
        return async(dispatch, getState) => {
            try {
                const respuesta = await axios.post('http://localhost:4000/api/usuarios/registrarse', nuevoUsuario)
                
                // if(!respuesta.data.success) {

                // }    
                // response.data.success 
                return respuesta.data.errores.details
                
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
                console.log(respuesta)

            } catch (error) {
                error = "Error en action de iniciar sesion"
            }
        }
    }
}


export default authActions;