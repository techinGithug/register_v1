import React, { Fragment, useState, useEffect, useContext} from 'react'
import axios from "axios"
import AppContext from "../../context/appContext"
import TeacherHeader from "../../components/headers/teacher-header"
import TeacherApi from "../../rest-api/teacher-api"

const TeacherSubjects = (props) => {
    const { getUser, getToken } = useContext(AppContext)
    const [subjects, setSubject] = useState([])

    useEffect( async () => {
        const token = getToken()
        const user = getUser()
        if(user === null) {
            props.history.push("/")
        } else {
            await axios.get(TeacherApi.subjects(), {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type':'application/json'
                    }
                })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }, []);

    return (
        <Fragment>
        <TeacherHeader props={props} />

        </Fragment>
    )
}

export default TeacherSubjects
