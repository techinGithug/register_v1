import { 
    ADD_STUDENT, 
    UPDATE_STUDENT, 
    DELETE_STUDENT,
    ADD_TEACHER, 
    UPDATE_TEACHER,
    DELETE_TEACHER,
    LOGOUT,
    AUTHEN_LOGIN,
    LAST_ACTION
 } from "../context/appAction";

 const appReducer = (state, action) => {
    switch(action.type) {
        case AUTHEN_LOGIN :
            return {
                ...state,
                authenLogin: {
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
    
        case DELETE_STUDENT :
            return {

            };

        case DELETE_TEACHER :
            return {

            };

        case LOGOUT: 
            return {
                ...state,
                authenLogin: {token:"", isLogin:false, userData:[]}
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