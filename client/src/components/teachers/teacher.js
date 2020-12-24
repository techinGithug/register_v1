import React, { Fragment, useEffect, useState, useContext } from 'react'

import AppContext from "../../context/appContext"
import TeacherHeader from "../../components/headers/teacher-header"

const Teacher = (props) => {
    const { getUser, getToken } = useContext(AppContext)

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
        <TeacherHeader props={props} />
        <div className="container mt-5 mb-3">
            <h5 className="text-center">Home page teacher...</h5>
        </div>
        </Fragment>
    )
}

export default Teacher
