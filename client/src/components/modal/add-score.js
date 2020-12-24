import React, { Fragment, useState } from 'react'
import axios from "axios"
import { 
    IoSaveOutline,
    IoCloseOutline
 } from "react-icons/io5";
 import Input from "../../components/forms/input"
 import AdminApi from "../../rest-api/admin-api"

const AddScore = ({ id, title, setIsAdd, token, type }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")

    const handleAdd = (e) => {
        e.preventDefault()
        switch(type) {
            case "teacher" :
                addTeacher()
            break;

            case "student" :
                addStudent()
            break;
        }
        
    };

    const addTeacher = async () => {
        await axios.post(AdminApi.addTeacher(), {
            username,
            password,
            firstname,
            lastname
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })
        .then((res) => {
            console.log(res)
            clearForm()
            setIsAdd(true)
        })
        .catch((err) => {
            console.error(err)
        })
    };

    const addStudent = async () => {
        await axios.post(AdminApi.addStudent(), {
            username,
            password,
            firstname,
            lastname
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })
        .then((res) => {
            console.log(res)
            clearForm()
            setIsAdd(true)
        })
        .catch((err) => {
            console.error(err)
        })
    };

    const clearForm = () => {
        setUsername("")
        setPassword("")
        setFirstname("")
        setLastname("")
    };

    return (
        <Fragment>
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="add" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="add">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={(e) => handleAdd(e)}>
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
                                placeholder="Passoword"
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
                             <div className="d-flex justify-content-end mt-3">
                                <button type="submit" className="btn btn-primary btn-sm me-1"><IoSaveOutline className="ics-1" /></button>
                                <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="modal"><IoCloseOutline className="ics-1" /></button>
                            </div>
                        </form>
                    </div>
                   
                </div>
            </div>
        </div>
        </Fragment>
    )
}

export default AddScore
