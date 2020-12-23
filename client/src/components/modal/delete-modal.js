import React, { Fragment, useState } from 'react'
import axios from "axios"
import { 
    IoCheckmarkOutline,
    IoCloseOutline
 } from "react-icons/io5";
 import Input from "../../components/forms/input"
 import AdminApi from "../../rest-api/admin-api"

const DeleteModal = ({ id, title, setIsDelete, token, body, userId, type}) => {

    const handleDelete = () => {
        switch(type) {
            case "teacher" :
                deleteTeacher()
            break;

            case "student" :
                deleteStudent()
            break;

            case "subject" :
                // deleteSubject()
            break;
        }
    };

    const deleteTeacher = async () => {
        await axios.put(AdminApi.softDeleteTeacher(), {
            id: userId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })
        .then((res) => {
            // console.log(res)
            setIsDelete(true)
        })
        .catch((err) => {
            console.error(err)
        })
    };

    const deleteStudent = async () => {
        await axios.put(AdminApi.softDeleteStudent(), {
            id: userId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })
        .then((res) => {
            console.log(res)
            setIsDelete(true)
        })
        .catch((err) => {
            console.error(err)
        })
    };

    // const deleteSubject = async () => {
    //     await axios.
    // };

    return (
        <Fragment>
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="delete" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="delete">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mx-2">
                            {body}
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                            <button type="submit" className="btn btn-primary btn-sm me-1" data-bs-dismiss="modal" onClick={() => handleDelete()}><IoCheckmarkOutline className="ics-1" /></button>
                            <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="modal"><IoCloseOutline className="ics-1" /></button>
                        </div>    
                    </div>
                   
                </div>
            </div>
        </div>
        </Fragment>
    )
}

export default DeleteModal
