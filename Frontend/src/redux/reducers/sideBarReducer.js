const initialState = {
  menuOpen: false
};

const sideBarReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'CHANGE_STATE':
          return{
            menuOpen: !state.menuOpen
          }
        default:
          return state
        
  }
}
export default sideBarReducer;
