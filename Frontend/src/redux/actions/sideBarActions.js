
const sideBarActions = {

    changeState: ()=>{
        return (dispatch, getState)=>{
            dispatch({type:'CHANGE_STATE'})
        }
    },
    closeSide: ()=>{
        return (dispatch, getState)=>{
            dispatch({type:'CLOSE'})
        }
    }


}


export default sideBarActions