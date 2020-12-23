import React, { Fragment, useContext, useState, useEffect } from 'react'
import axios from "axios"
import { 
    IoAddOutline,
    IoCloseOutline
 } from "react-icons/io5";
import StduentHeader from "../../components/headers/student-header"
import AppContext from "../../context/appContext"
import AdminApi from "../../rest-api/admin-api"
import StudentApi from "../../rest-api/student-api"
import AlertWarning from "../../components/alerts/warning"

const StudentRegister = (props) => {
    const { getUser, getToken } = useContext(AppContext)
    const [subjectLists, setSubjectLits] = useState([])
    const [register, setRegister] = useState([])

    useEffect(() => {
        init()
        initRegist()
    }, []);

    const init = async () => {
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
    };

    const initRegist = async () => {
        const token = getToken()
        const { userData } = getUser()
        const stdId = userData.id
        await axios.get(StudentApi.getRegistration(), { 
            params: { "id":stdId },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        }, )
        .then((res) => {
            console.log(res)
            const { data } = res
            if(data.length > 0) {
                setRegister(data)
            }
        })
        .catch((err) => {
            console.error(err)
        })
    };

    const handleRegisted = async (item) => {
        const { userData } = getUser()
        const stdId = userData.id
        const { id: sjId, sj_teacher: tId } = item
        await axios.post(StudentApi.register(), {
            stdId,
            sjId,
            tId
        }, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type':'application/json'
            }
        })
        .then((res) => {
            initRegist()
        })
        .catch((err) => {
            console.error(err)
        })
    };

    const removeRegist = (id) => {
        console.log(`Remove register id : ${id}`)
    };

    const renderRegisted = () => {
        if(register.length > 0) {
            return(
                <Fragment>
                <table className="table mb-5">
                    <thead>
                        <tr className="text-center">
                            <th scope="col" width="100">Code</th>
                            <th scope="col" width="300">Name</th>
                            <th scope="col" width="50">Credit</th>
                            <th scope="col">Teacher</th>
                            <th scope="col" width="10"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {register.map((item) => (
                        <tr key={item.id}>
                            <td>{item.sj_code}</td>
                            <td>{item.sj_name}</td>
                            <td className="text-center">{item.sj_credit}</td>
                            <td>{item.t_firstname} {item.t_lastname}</td>
                            <td>
                                <button className="btn btn-danger btn-sm me-1" onClick={() => removeRegist(item.id)}><IoCloseOutline className="ics-1" /></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </Fragment>
            )

        } else {
            return(
                <div className="text-center"><AlertWarning message="Not register yet!" /></div>
            )
        }
    };

    return (
        <Fragment>
        <StduentHeader props={props} />
        <div className="container w-50">
            <h5 className="text-center mt-3 mb-3 fw-bold">Registration</h5>
            {
                renderRegisted()
            }
            <h5 className="text-center mt-5 mb-3 fw-bold">Subjects</h5>
            <table className="table mb-5">
                <thead>
                    <tr className="text-center">
                        <th scope="col" width="100">Code</th>
                        <th scope="col" width="300">Name</th>
                        <th scope="col" width="50">Credit</th>
                        <th scope="col">Teacher</th>
                        <th scope="col" width="10"></th>
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
                            <button className="btn btn-primary btn-sm me-1" onClick={() => handleRegisted(item)}><IoAddOutline className="ics-1" /></button>
                            {/* <button className="btn btn-danger btn-sm"><IoTrashOutline className="ics-1" /></button>  */}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </Fragment>
    )
}

export default StudentRegister
