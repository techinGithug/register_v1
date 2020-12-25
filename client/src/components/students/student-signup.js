import Axios from 'axios'
import React, { Fragment, useState } from 'react'
import Input from "../../components/forms/input"
import axios from "axios"
import StudentApi from "../../rest-api/student-api"

const StudentSignUp = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSignUp = async (e) => {
        e.preventDefault()
        await axios.post(StudentApi.addStudent(), {
            username,
            password,
            firstname,
            lastname
        })
        .then((res) => {
            // console.log(res)
            const { data } = res
            if(data.message !== "") {
                props.history.push("/")
            } else {
                
            }
        })
        .catch((err) => {
            console.error(err)
        })
    };

    return (
        <Fragment>
            <div className="w-25 mx-auto mt-5 mb-3">
                <div className="text-center fs-4 mb-3">Register student</div>
                <form onSubmit={(e) => handleSignUp(e)}>
                    <Input
                        label="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <Input
                        label="Firstname"
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        placeholder="Firstname"
                    />
                    <Input
                        label="Lastname"
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Lastname"
                    />
                   <button className="btn btn-sm btn-primary me-1">Sign up</button>
                   <button className="btn btn-sm btn-success" onClick={() => props.history.push("/")}>Back</button>
                </form>
            </div>
            <h5></h5>
        </Fragment>
    )
}

export default StudentSignUp
