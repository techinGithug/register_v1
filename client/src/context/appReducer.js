import { 
    ADD_STUDENT, 
    UPDATE_STUDENT, 
    DELETE_STUDENT,
    ADD_TEACHER, 
    UPDATE_TEACHER,
    DELETE_TEACHER,
    LOGOUT,
    LOGIN,
    LAST_ACTION,
    ADD_LOG
 } from "../context/appAction";

 const appReducer = (state, action) => {
    switch(action.type) {
        case LOGIN :
            return {
                ...state,
                loginData: {
                    token: action.payload.token, 
                    isLogin: action.payload.isLogin,
                    userData: action.payload.userData
                }
            };
        
        case ADD_STUDENT :
            return {

            };

        case ADD_TEACHER :
            return {

            };

        case ADD_LOG :
            return{
                ...state,
                logData: [{logs: action.payload}]
            };
    
        case DELETE_STUDENT :
            return {

            };

        case DELETE_TEACHER :
            return {

            };

        case LOGOUT: 
            return {
                ...state,
                loginData: {token:"", isLogin:false, userData:[]}
            };

        case UPDATE_TEACHER :
            return {

            };

        case UPDATE_STUDENT :
            return {

            };

        case LAST_ACTION : 
            return {
                ...state,
                lastAction: {
                    "action":`Add score`,
                    "data": action.payload,
                }
            };

        default :
            return state;
    }
 }

 export default appReducer;