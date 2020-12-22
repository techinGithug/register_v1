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

const AdminTeachers = (props) => {
    const { getUser, getToken } = useContext(AppContext)
    const [teacherLists, setTeacherLits] = useState([])
    const [oldUsername, setOldUsername] = useState("")
    const [oldpassword, setOldPassword] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [userId, setUserId] = useState("")
    const [isAdd, setIsAdd] = useState(false)
    const [isDelete, setIsDelete] = useState(false)

    useEffect(() => {
        init()
    }, [])

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
            await axios.get(AdminApi.getAllTeachers(), {
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
                    setTeacherLits(data)

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
            id="addTeacher" 
            title="Add teacher"
            setIsAdd={setIsAdd}
            token={getToken()}
        />
        <DeleteModal 
            id="deleteTeacher" 
            userId={userId}
            title="Delete teacher"
            setIsDelete={setIsDelete}
            token={getToken()}
            body="Are your sure to delete this teacher!"
        />
        <AdminHeader props={props} />
        <div className="container w-50">
            <h5 className="text-center mt-5 mb-3 fw-bold">Teachers</h5>
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addTeacher">
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
                {teacherLists.map((item) => (
                    <tr key={item.id}>
                        <td><input type="password" className="form-control" value={item.t_username} onChange={(e) => setOldUsername(e.target.value)} readOnly /></td>
                        <td><input type="password" className="form-control" value={item.t_password} onChange={(e) => setOldPassword(e.target.value)} readOnly /></td>
                        <td>{item.t_firstname} {item.t_lastname}</td>
                        <td>
                            <button className="btn btn-success btn-sm me-1"><IoCreateOutline className="ics-1" /></button>
                            {/* <button className="btn btn-danger btn-sm">
                                <IoTrashOutline className="ics-1" />
                            </button>  */}
                            <button type="button" className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteTeacher" onClick={() => setUserId(item.id)}>
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

export default AdminTeachers
