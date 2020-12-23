import React, { Fragment, useContext, useEffect, useState } from 'react'
import axios from "axios"
import { 
    IoTrashOutline,
    IoCreateOutline,
    IoAddCircleOutline
 } from "react-icons/io5";
import AdminApi from "../../rest-api/admin-api"
import AppContext from "../../context/appContext"
import AdminHeader from "../headers/admin-header"
import AddModal from "../../components/modal/add-modal"
import DeleteModal from "../../components/modal/delete-modal"

const AdminStudents = (props) => {
    const { getUser, getToken } = useContext(AppContext)
    const [studentLists, setStudentLits] = useState([])
    const [oldUsername, setOldUsername] = useState("")
    const [oldpassword, setOldPassword] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [userId, setUserId] = useState("")
    const [isAdd, setIsAdd] = useState(false)
    const [isDelete, setIsDelete] = useState(false)

    useEffect( async () => {
        init()
    }, []);

    useEffect(() => {
        if(isAdd) {
            init()
            setTimeout(() => {
                setIsAdd(false)
            }, 2000);
        }

        if(isDelete) {
            init()
            setTimeout(() => {
                setIsDelete(false)
            }, 2000);
        }
        
    }, [isAdd, isDelete]);

    const init = async () => {
        const user = getUser()
        if(user === null) {
            props.history.push("/")
        } else {
            const token = getToken()
            await axios.get(AdminApi.getAllStudents(), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type':'application/json'
                }
            })
            .then((res) => {
                // console.log(res)
                const { data } = res
                if(data.length > 0) {
                    // console.log(data)
                    setStudentLits(data)

                } else if(data.length === 0) {
                    console.log(data)
                }
            })
            .catch((err) => {
                console.error(err)
            })
        }
    };



    return (
        <Fragment>
        <AddModal 
            id="addStudent" 
            title="Add student"
            setIsAdd={setIsAdd}
            token={getToken()}
            type="student"
        />
        <DeleteModal 
            id="deleteStudent" 
            userId={userId}
            title="Delete student"
            setIsDelete={setIsDelete}
            token={getToken()}
            body="Are your sure to delete this student!"
            type="student"
        />
        <AdminHeader props={props} />
        <div className="container w-50">
            <h5 className="text-center mt-5 mb-3 fw-bold">Students</h5>
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addStudent">
                    <IoAddCircleOutline className="ics-3" />
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr className="text-center">
                        <th scope="col" width="">Username</th>
                        <th scope="col" width="">Password</th>
                        <th scope="col" width="200">Fullname</th>
                        <th scope="col" width="92"></th>
                    </tr>
                </thead>
                <tbody>
                {studentLists.map((item) => (
                    <tr key={item.id}>
                        <td><input type="password" className="form-control" value={item.std_username} onChange={(e) => setOldUsername(e.target.value)} readOnly /></td>
                        <td><input type="password" className="form-control" value={item.std_password} onChange={(e) => setOldPassword(e.target.value)} readOnly /></td>
                        <td>{item.std_firstname} {item.std_lastname}</td>
                        <td>
                            <button className="btn btn-success btn-sm me-1"><IoCreateOutline className="ics-1" /></button>
                            <button type="button" className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteStudent" onClick={() => setUserId(item.id)}>
                                <IoTrashOutline className="ics-1" />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </Fragment>
    )
}

export default AdminStudents
