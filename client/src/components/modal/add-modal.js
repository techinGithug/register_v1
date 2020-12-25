import React, { Fragment, useState, useEffect, useContext } from 'react'
import axios from "axios"
import { 
    IoSaveOutline,
    IoCloseOutline
 } from "react-icons/io5";
 import AppContext from "../../context/appContext"
 import Input from "../../components/forms/input"
 import AdminApi from "../../rest-api/admin-api"
 import TeacherApi from "../../rest-api/teacher-api"

const AddModal = ({ id, title, setIsAdd, token, type }) => {
    const { lastAction } = useContext(AppContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [score, setScore] = useState("")

    const handleAdd = (e) => {
        e.preventDefault()
        switch(type) {
            case "teacher" :
                addTeacher(e)
            break;

            case "student" :
                addStudent(e)
            break;

            case "score" :
                addScore(e)
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

    const addScore = async (e) => {
        e.preventDefault()
        const { id } = lastAction.data
        const { grade, grade_ } = calGrade()
        if(grade_ === "**" && grade_ === "**") {
            console.log("Grade inccorect!")
            return
        }
        await axios.put(TeacherApi.score(), {
                id,
                score,
                grade,
                grade_
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type':'application/json'
                }
            })
            .then((res) => {
                // console.log(res)
                setIsAdd(true)
                clearScore()
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

    const clearScore = () => {
        setScore("")
    };

    const calGrade = () => {
        let data = {
            "grade":"",
            "grade_":""
        };

        // let grade = ""
        // let grade_ = ""
        if(score < 50) {
            data.grade = "F"
            data.grade_ = "0"
        } else if(score > 50 && score <= 60){
            data.grade = "D"
            data.grade_ = "1"
        } else if(score > 60 && score <= 70){
            data.grade = "C"
            data.grade_ = "2"
        } else if(score > 70 && score <= 80){
            data.grade = "B"
            data.grade_ = "3"
        } else if(score > 80 && score <= 100) {
            data.grade = "A"
            data.grade_ = "4"
        } else {
            data.grade = "**"
            data.grade_ = "**"
        }

        return data
    }

    const renderModalBody = () => {
        if(type === "student") {
            return (
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
            )
        }
        
        if(type === "teacher") {
            return (
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
            )
        }

        if(type === "score") {
            return (
                <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="add" aria-hidden="true">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="add">{title}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(e) => handleAdd(e)}>
                                    <input type="number" className="form-control" value={score} onChange={(e) => setScore(e.target.value)} />
                                    <div className="d-flex justify-content-end mt-3">
                                        <button type="submit" className="btn btn-primary btn-sm me-1"><IoSaveOutline className="ics-1" /></button>
                                        <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="modal"><IoCloseOutline className="ics-1" /></button>
                                    </div>
                                </form>
                            </div>
                        
                        </div>
                    </div>
                </div>
            )
        }
    };

    return (
        <Fragment>
        {renderModalBody()}
        </Fragment>
    )
}

export default AddModal
