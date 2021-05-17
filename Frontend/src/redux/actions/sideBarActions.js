import axios from 'axios';


const sideBarActions = {

    changeState: ()=>{
        return (dispatch, getState)=>{
            dispatch({type:'CHANGE_STATE'})
        }
    }

}


export default sideBarActions