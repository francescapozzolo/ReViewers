const initialState = {
  usuarioLogeado: null
}

const authReducer = (state = initialState, action) => {
  // console.log(state)
  switch (action.type) {
    
    case 'INGRESO_USUARIO':
      localStorage.setItem('usuarioLogeado', JSON.stringify({nombre: action.payload.nombre, imagen: action.payload.imagen, usuarioComprobado: action.payload.usuarioComprobado}))
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        usuarioLogeado: action.payload
      }
    
    case 'DESLOGUEO_USUARIO':
      localStorage.clear()
      return {
        ...state,
        usuarioLogeado: null
      }

    default:
      return state;
  }
};

export default authReducer;
