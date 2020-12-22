import React, { useReducer } from "react"
import axios from "axios"
import AppContext from "../context/appContext"
import AppReducer from "../context/appReducer"
import InitialState from "../context/initialState"
import AuthApi from "../rest-api/auth-api"
import { 
    AUTHEN_LOGIN,
    LOGOUT,
    REGISTER_STUDENT,

} from "../context/appAction";

const AppState = (props) => {
    const [state, dispatch] = useReducer(AppReducer, InitialState)
    // Add student

    // Update student

    // Delete student

    // Authen login
    const authLogin = async (username) => {
        await axios.post(AuthApi.authLogin(), {
                username
            })
            .then((res) => {
                // console.log(res)
                const { data } = res
                setToken(data.accessToken)
            })
            .catch((err) => {
                console.error(err)
            })
        
    };

    const setToken = (token) => {
        localStorage.setItem("token", JSON.stringify(token))
    };

    const getToken = () => {
        return JSON.parse(localStorage.getItem("token"))
    };

    const clearToken = () => {
        localStorage.removeItem("token")
    };

    // Login
    const login = (details) => {
        setUserData(details)
        dispatch({
            type: AUTHEN_LOGIN,
            payload: details
        })
    };

    const registerStudent = async (data) => {
        dispatch({
            type: REGISTER_STUDENT,
            payload: data
        })
    };

    // Logout
    const logout = () => {
        clearUserData()
        clearToken()
        dispatch({
            type: LOGOUT
        })
    };

    // GENERAL //
    const setUserData = (data) => {
        localStorage.setItem("user", JSON.stringify(data))
    };

    const getUser = () => {
        return JSON.parse(localStorage.getItem("user"))
    };

    const clearUserData = () => {
        localStorage.removeItem("user")
    };

    const genId = () => {
        const date = new Date()
        return (`${date.getFullYear()}${(date.getMonth()+1)}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`)
    };

    // const genToken = () => {
    //     let pass = ""; 
    //     let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +  
    //             'abcdefghijklmnopqrstuvwxyz0123456789@#$'; 
          
    //     for (let i = 1; i <= 15; i++) { 
    //         var char = Math.floor(Math.random() * str.length + 1); 
    //         pass += str.charAt(char) 
    //     } 
    //     return pass
    // };

    const setSubjectStorage = (data) => {
        localStorage.setItem("subject", data)
    };

    return (
        <AppContext.Provider value={{
            // Sate
            authenLogin: state.authenLogin,
            admins: state.admins,
            register: state.register,
            students: state.students,
            teachers: state.teachers,
            userData: state.userData,
            
            // Action
            authLogin,
            clearUserData,
            genId,
            getUser,
            getToken,
            login,
            logout,
            registerStudent,
            setUserData,
            setSubjectStorage,
            
        }}
        >
            {props.children}
        </AppContext.Provider>
    );

}

export default AppState;