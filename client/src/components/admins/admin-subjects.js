import React, { Fragment, useContext, useEffect, useState } from 'react'
import axios from "axios"
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
        <table className="table container mt-5">
            <thead>
                <tr className="text-center">
                    <th scope="col" width="100">CODE</th>
                    <th scope="col">NAME</th>
                    <th scope="col" width="50">CREDIT</th>
                    <th scope="col">TEACHER</th>
                </tr>
            </thead>
            <tbody>
            {subjectLists.map((item) => (
                <tr key={item.id}>
                    <td>{item.sj_code}</td>
                    <td>{item.sj_name}</td>
                    <td className="text-center">{item.sj_credit}</td>
                    <td>{item.sj_teacher}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </Fragment>
    )
}

export default AdminSubjects
