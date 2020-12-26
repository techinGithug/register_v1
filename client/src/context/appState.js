import React, { useReducer } from "react"
import axios from "axios"
import AppContext from "../context/appContext"
import AppReducer from "../context/appReducer"
import InitialState from "../context/initialState"
import AuthApi from "../rest-api/auth-api"
import { 
    ADD_LOG,
    LOGIN,
    LOGOUT,
    LAST_ACTION,
} from "../context/appAction";

const AppState = (props) => {
    const [state, dispatch] = useReducer(AppReducer, InitialState)

    // Authen login
    const authLogin = async (username, type) => {
        await axios.post(AuthApi.authLogin(), {
                username,
                type
            })
            .then((res) => {
                // console.log(res)
                const { data } = res
                if(data !== "") {
                    setToken(data.accessToken)
                }
            })
            .catch((err) => {
                console.error(err)
            })
        
    };

    // Login
    const login = (loginData) => {
        setUserData(loginData)
        dispatch({
            type: LOGIN,
            payload: loginData
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

    const teacherAddScore = (data) => {
        dispatch({
            type: LAST_ACTION,
            payload: data
        })
    };

    const addLog = (logData) => {
        // console.log(JSON.stringify(logData))
        saveLog(logData)
        // dispatch({
        //     type: ADD_LOG,
        //     payload: logData
        // })
    };

    // GENERAL //
    const clearToken = () => {
        localStorage.removeItem("token")
    };

    const clearUserData = () => {
        localStorage.removeItem("user")
    };

    const getUser = () => {
        return JSON.parse(localStorage.getItem("user"))
    };

    const getToken = () => {
        return JSON.parse(localStorage.getItem("token"))
    };

    const genId = () => {
        const date = new Date()
        return (`${date.getFullYear()}${(date.getMonth()+1)}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`)
    };

    const setUserData = (data) => {
        localStorage.setItem("user", JSON.stringify(data))
    };

    const setToken = (token) => {
        localStorage.setItem("token", JSON.stringify(token))
    };

    const setSubjectStorage = (data) => {
        localStorage.setItem("subject", data)
    };

    const saveLog = (logData) => {
        // console.log(JSON.stringify(logData))
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
    

    return (
        <AppContext.Provider value={{
            // Sate
            loginData: state.loginData,
            lastAction: state.lastAction,
            // logData: state.logData,
            
            // Action
            authLogin,
            addLog,
            clearUserData,
            genId,
            getUser,
            getToken,
            login,
            logout,
            setUserData,
            setSubjectStorage,
            teacherAddScore

        }}
        >
            {props.children}
        </AppContext.Provider>
    );

}

export default AppState;