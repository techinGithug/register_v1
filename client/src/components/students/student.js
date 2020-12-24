import React, { Fragment, useEffect, useState, useContext } from 'react'
import axios from "axios"
import AppContext from "../../context/appContext"
import StudentHeader from "../headers/student-header"
import AdminApi from "../../rest-api/admin-api"

const Student = (props) => {
    const { getUser, getToken } = useContext(AppContext)
    const [subjectLists, setSubjectLists] = useState([])

    useEffect( async () => {
        const user = getUser()
        if(user === null) {
            props.history.push("/")
        } else {
            // const token = getToken()
            // await axios.get(AdminApi.getAllSubjects(), {
            //     headers: {
            //         'Authorization': `Bearer ${token}`,
            //         'Content-Type':'application/json'
            //     }
            // })
            // .then((res) => {
            //     // console.log(res)
            //     const { data } = res
            //     if(data.length > 0) {
            //         // console.log(data)
            //         setSubjectLists(data)

            //     } else if(data.length === 0) {
            //         console.log(data)
            //     }
            // })
            // .catch((err) => {
            //     console.error(err)
            // })
        }
    }, []);

    return (
        <Fragment>
        <StudentHeader props={props} />
        <div className="container mt-5 mb-3">
            <h5 className="text-center">Home page student...</h5>
        </div>
        </Fragment>
    )
}

export default Student
