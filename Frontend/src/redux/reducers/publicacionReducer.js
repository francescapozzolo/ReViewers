
const initialState = {
    todasLasPublicaciones: [],
    publicacionesFiltradas: []
};

const publicacionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CARGAR_PUBLICACIONES':
      return{
        ...state,
        todasLasPublicaciones: action.payload,
        publicacionesFiltradas: action.payload
      }
    break
      
    case 'CARGAR_COMENTARIO':
      const publicacionModificada = state.todasLasPublicaciones.find(publicacion => publicacion._id ===  action.payload._id)
      return {
        ...state,
        todasLasPublicaciones: state.todasLasPublicaciones.map(publicacion => publicacion._id === publicacionModificada._id ? publicacionModificada: publicacion) 
      }
    break

    default:
      return state;
  }
};

export default publicacionReducer;
