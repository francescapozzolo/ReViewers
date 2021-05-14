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
      
      case 'FILTRO_POR_PALABRA_CLAVE':
        const valorDelFiltro = action.payload
        return {
          ...state,
          publicacionesFiltradas: state.todasLasPublicaciones.filter( publicacion => {
            return publicacion.tags.find(tag => tag.toLowerCase().trim().slice(0, valorDelFiltro.length) === valorDelFiltro.toLowerCase())
          })
        }



    default:
      return state;
  }
};

export default publicacionReducer;
