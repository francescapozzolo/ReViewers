const initialState = {
  menuOpen: false
};

const sideBarReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'CHANGE_STATE':
          return{
            menuOpen: !state.menuOpen
          }
      case 'CLOSE':
        return{
          menuOpen:false
        }
        
        default:
          return state
        
  }
}
export default sideBarReducer;
