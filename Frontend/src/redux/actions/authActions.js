import axios from 'axios';


const authActions = {

    crearUsuario: (nuevoUsuario) => {
        return async(dispatch, getState) => {
            try {
                const response = await axios.post('http://localhost:4000/api/usuarios/registrarse', nuevoUsuario)
                console.log(response)
                
            } catch (error) {
                error = "Error en action de crear usuario"
            }
        }
    },

    iniciarSesion: (usuario) => {
        return async(dispatch, getState) => {
            console.log(usuario)
            try {
                const response = await axios.post('http://localhost:4000/api/usuarios/iniciarSesion', usuario)
                console.log(response)

            } catch (error) {
                error = "Error en action de iniciar sesion"
            }
        }
    }
}


export default authActions;