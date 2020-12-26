import React, { Fragment, useState, useEffect, useContext} from 'react'
import axios from "axios"
import {
    IoCreateOutline
} from "react-icons/io5"
import AppContext from "../../context/appContext"
import TeacherHeader from "../../components/headers/teacher-header"
import TeacherApi from "../../rest-api/teacher-api"

const TeacherSubjects = (props) => {
    const { getUser, getToken } = useContext(AppContext)
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        init()
    }, []);

    const init = async () => {
        const token = getToken()
        const user = getUser()
        if(user === null) {
            props.history.push("/")
        } else {
            const { id } = user.userData
            await axios.get(TeacherApi.subjects(), {
                    params: {"id":id},
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type':'application/json'
                    }
                })
                .then((res) => {
                    // console.log(res)
                    setSubjects(res.data)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    };



    return (
        <Fragment>
        <TeacherHeader props={props} />
        <div className="mx-auto w-50 mt-5 mb-3">
            <h5 className="text-center mb-3">Subjects</h5>
            <table className="table table-hover">
                <thead>
                    <tr className="text-center">
                        <th scope="col" width="100">Code</th>
                        <th scope="col" width="">Subject</th>
                        <th scope="col" width="50">Credit</th>
                        {/* <th scope="col" width="50"></th> */}
                    </tr>
                </thead>
                <tbody>
                {subjects.map((item) => (
                    <tr key={item.id}>
                        <td>{item.sj_code}</td>
                        <td>{item.sj_name}</td>
                        <td className="text-center">{item.sj_credit}</td>
                        {/* <td>
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => console.log("TEST...")}>  data-bs-toggle="modal" data-bs-target="#score" 
                                <IoCreateOutline className="ics-1" />
                            </button>
                        </td> */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </Fragment>
    )
}

export default TeacherSubjects
