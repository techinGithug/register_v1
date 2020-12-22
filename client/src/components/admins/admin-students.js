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

const AdminStudents = (props) => {
    const { getUser, getToken } = useContext(AppContext)
    const [studentLists, setStudentLits] = useState([])
    const [oldUsername, setOldUsername] = useState("")
    const [oldpassword, setOldPassword] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")

    useEffect( async () => {
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
    }, [])

    return (
        <Fragment>
        <AdminHeader props={props} />
        <div className="container w-50">
            <h5 className="text-center mt-5 mb-3 fw-bold">Students</h5>
            <div className="d-flex justify-content-end"><button className="btn btn-primary btn-sm"><IoAddCircleOutline className="ics-3" /></button></div>
            <table className="table">
                <thead>
                    <tr className="text-center">
                        <th scope="col" width="">Username</th>
                        <th scope="col" width="">Password</th>
                        <th scope="col" width="300">Fullname</th>
                        <th scope="col" width="100"></th>
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
                            <button className="btn btn-danger btn-sm"><IoTrashOutline className="ics-1" /></button> 
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
