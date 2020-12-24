import React, { Fragment, useState, useContext } from "react"
import { 
    IoPersonCircleOutline
} from "react-icons/io5"
import axios from "axios"
import AdminApi from "../rest-api/admin-api"
import StudentApi from "../rest-api/student-api"
import TeacherApi from "../rest-api/teacher-api"
import AlertError from "../components/alerts/danger"
import Input from "./forms/input"
import Select from "./forms/select"
import { types } from "../data/data.json"
import AppContext from "../context/appContext"

const Login = (props) => {
    const { authLogin, getToken, login } = useContext(AppContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [type, setType] = useState("")
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(type === "" || type === "--") {
            setMessage("Please select type before!")
            setIsError(true)
            setTimeOutError()

        } else {
            if(type === "Student") {
                await authLogin(username)
                const token = await getToken()
                studentLogin(token)

            } else if(type === "Teacher") {
                await authLogin(username)
                const token = await getToken()
                teacherLogin(token)

            } else if(type === "Admin") {
                await authLogin(username)
                const token = await getToken()
                adminLogin(token)
            }
            
            clearTimeOutError()
        }
    };

    const studentLogin = async (token) => {
        await axios.get(StudentApi.student(), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type':'application/json'
                }
            })
            .then((res) => {
                // console.log(res)
                const { data } = res
                if(data.length > 0) {
                    const {std_username: username_, std_password: password_ } = data[0]
                    if(username === username_ && password === password_) {
                        const details = {
                            token,
                            isLogin: true,
                            userData: data[0]
                        };
                        login(details)
                        props.history.push("/student")

                    } else {
                        setMessage("Username or password incorrect!")
                        setIsError(true)
                        setTimeOutError()
                    }

                } else if(data.length === 0){
                    setMessage("Not fund this user!")
                    setIsError(true)
                    setTimeOutError()
                }
            })
            .catch((err) => {
                console.error(err)
            })
    };

    const teacherLogin = async (token) => {
        await axios.get(TeacherApi.teacher(), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type':'application/json'
                }
            })
            .then((res) => {
                // console.log(res)
                const { data } = res
                if(data.length > 0) {
                    const {t_username: username_, t_password: password_ } = data[0]
                    if(username === username_ && password === password_) {
                        const details = {
                            token,
                            isLogin: true,
                            userData: data[0]
                        };
                        login(details)
                        props.history.push("/teacher")

                    } else {
                        setMessage("Username or password incorrect!")
                        setIsError(true)
                        setTimeOutError()
                    }

                } else if(data.length === 0){
                    setMessage("Not fund this user!")
                    setIsError(true)
                    setTimeOutError()
                }
            })
            .catch((err) => {
                console.error(err)
            })
    };

    const adminLogin = async (token) => {
        await axios.get(AdminApi.admin(), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })
        .then((res) => {
            // console.log(res)
            const { data } = res
            if(data.length > 0) {
                const { am_username: username_, am_password: password_ } = data[0]
                if(username === username_ && password === password_) {
                    const details = {
                        token,
                        isLogin: true,
                        userData: data[0]
                    };
                    login(details)
                    props.history.push("/admin")

                } else {
                    setMessage("Username or password incorrect!")
                    setIsError(true)
                    setTimeOutError()
                }

            } else if(data.length === 0){
                setMessage("Not fund this user!")
                setIsError(true)
                setTimeOutError()
            }
        })
        .catch((err) => {
            console.error(err)
        })
    };

    const handleSignUp = () => {
        if(type === "" || type === "--") {
            setMessage("Please select type before!")
            setIsError(true)
            setTimeOutError()

        } else {
            if(type === "Student") {
                props.history.push("/student-signup")

            } else if(type === "Teacher") {
                // props.history.push("/teacher-signup")
                console.log("Teacher...")

            } else if(type === "Admin") {
                console.log("Admin...")
            }
            
            clearTimeOutError()
        }
    };

    const clearTimeOutError = () => {
        setMessage("")
        setIsError(false)
    };

    const setTimeOutError = () => {
        setTimeout(() => {
            setMessage("")
            setIsError(false)
        }, 5000);
    };

    return (
        <Fragment>
            <div className="w-25 mx-auto" style={{ marginTop: '10%'}}>
                {/* <IoPersonCircleOutline className="mx-auto" style={{ fontSize: '150px' }} /> */}
                <form className="mb-3" onSubmit={(e) => handleSubmit(e)}>
                    <Input 
                        label="Username" 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} placeholder="Username" 
                    />
                    <Input 
                        label="Password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} placeholder="Password" 
                    />
                    <Select 
                        label="Type" 
                        datas={types} 
                        value={type} 
                        onChange={(e) => setType(e.target.value)} 
                        type="type"
                    />
                    <button type="submit" className="btn btn-sm btn-primary me-1">Login</button>
                    <button type="button" className="btn btn-sm btn-success" onClick={() => handleSignUp()}>Sign up</button>
                </form>
                {isError ? <AlertError message={message} /> : null }
            </div>

        </Fragment>
    )
}

export default Login
