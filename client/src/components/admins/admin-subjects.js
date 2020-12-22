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

const AdminSubjects = (props) => {
    const { getUser, getToken } = useContext(AppContext)
    const [subjectLists, setSubjectLits] = useState([])

    useEffect( async () => {
        const user = getUser()
        if(user === null) {
            props.history.push("/")
        } else {
            const token = getToken()
            await axios.get(AdminApi.getAllSubjects(), {
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
                    setSubjectLits(data)

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
            <h5 className="text-center mt-5 mb-3 fw-bold">Subjects</h5>
            <div className="d-flex justify-content-end"><button className="btn btn-primary btn-sm"><IoAddCircleOutline className="ics-3" /></button></div>
            <table className="table">
                <thead>
                    <tr className="text-center">
                        <th scope="col" width="100">Code</th>
                        <th scope="col" width="300">Name</th>
                        <th scope="col" width="50">Crdit</th>
                        <th scope="col">Teacher</th>
                        <th scope="col" width="92"></th>
                    </tr>
                </thead>
                <tbody>
                {subjectLists.map((item) => (
                    <tr key={item.id}>
                        <td>{item.sj_code}</td>
                        <td>{item.sj_name}</td>
                        <td className="text-center">{item.sj_credit}</td>
                        <td>{item.t_firstname} {item.t_lastname}</td>
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

export default AdminSubjects
