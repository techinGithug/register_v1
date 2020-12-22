import React, { Fragment, useEffect, useContext } from 'react'
import AppContext from "../../context/appContext"
import StudentHeader from "../headers/student-header"

const Student = (props) => {
    const { getUser } = useContext(AppContext)

    useEffect(() => {
        const user = getUser()
        if(user === null) {
            props.history.push("/")
        }
    }, [])

    return (
        <Fragment>
            <StudentHeader props={props} />
        </Fragment>
    )
}

export default Student
