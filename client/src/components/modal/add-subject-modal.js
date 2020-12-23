import React, { Fragment, useState, useEffect } from 'react'
import axios from "axios"
import { 
    IoSaveOutline,
    IoCloseOutline
 } from "react-icons/io5";
 import Input from "../../components/forms/input"
 import Select from "../../components/forms/select"
 import AdminApi from "../../rest-api/admin-api"

const AddSubjectModal = ({ id, title, setIsAdd, token, type }) => {
    const [teacherLists, setTeacherLists] = useState([])
    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const [credit, setCredit] = useState("")
    const [teacher, setTeacher] = useState("1")

    useEffect( async () => {
        await axios.get(AdminApi.getAllTeachers(), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })
        .then((res) => {
            const { data } = res
            setTeacherLists(data)
        })
        .catch((err) => {
            console.error(err)
        })

    }, []);

    const handleAdd = (e) => {
        e.preventDefault()
        addSubject()
    };

    const addSubject = async () => {
        await axios.post(AdminApi.addSubject(), {
            code,
            name,
            credit,
            teacher
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
        setCode("")
        setName("")
        setCredit("")
        // setTeacher("")
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
                                label="Code"
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Code"
                            />
                            <Input
                                label="Name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Subject name"
                            />
                            <Input
                                label="Credit"
                                type="number"
                                value={credit}
                                onChange={(e) => setCredit(e.target.value)}
                                placeholder="Cridit"
                            />
                            <Select 
                                label="Teacher" 
                                datas={teacherLists} 
                                value={teacher} 
                                onChange={(e) => setTeacher(e.target.value)} 
                                type="teacher"
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

export default AddSubjectModal
