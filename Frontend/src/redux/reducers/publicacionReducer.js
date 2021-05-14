const initialState = {
    publicaciones: []
};

const publicacionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CARGAR_PUBLICACIONES':
        return{
            ...state,
            publicaciones: action.payload
        }
    default:
      return state;
  }
};

export default publicacionReducer;
