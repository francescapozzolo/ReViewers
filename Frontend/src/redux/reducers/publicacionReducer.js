
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
      
<<<<<<< HEAD
    case 'CARGAR_COMENTARIO':
      const publicacionModificada = state.todasLasPublicaciones.find(publicacion => publicacion._id ===  action.payload._id)
      return {
        ...state,
        todasLasPublicaciones: state.todasLasPublicaciones.map(publicacion => publicacion._id === publicacionModificada._id ? publicacionModificada: publicacion) 
      }
    break
=======
      case 'FILTRO_POR_PALABRA_CLAVE':
        const valorDelFiltro = action.payload
        return {
          ...state,
          publicacionesFiltradas: state.todasLasPublicaciones.filter( publicacion => {
            return publicacion.tags.find(tag => tag.toLowerCase().trim().slice(0, valorDelFiltro.length) === valorDelFiltro.toLowerCase())
          })
        }
      
      
      case 'CARGAR_COMENTARIO':
        const publicacionModificada = state.todasLasPublicaciones.find(publicacion => publicacion._id ===  action.payload._id)
        return {
          ...state,
          todasLasPublicaciones: state.todasLasPublicaciones.map(publicacion => publicacion._id === publicacionModificada._id ? publicacionModificada: publicacion) 
        }
      
>>>>>>> e07c7c9de32ba84f1a446ab9024dd8d954f8ce82

    default:
      return state;
  }
};

export default publicacionReducer;
