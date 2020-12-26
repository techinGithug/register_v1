import React, { Fragment, useEffect, useState, useContext } from 'react'
import axios from "axios"
import AppContext from "../../context/appContext"
import AdminHeader from "../headers/admin-header"
import AdminApi from "../../rest-api/admin-api"
import { IoLogoXing } from 'react-icons/io5'

const Admin = (props) => {
    const { getUser, getToken } = useContext(AppContext)
    const [countAdmin, setCountAdmin] = useState(0)
    const [countTeacher, setcountTeacher] = useState(0)
    const [countSubject, setCountSubject] = useState(0)
    const [countStudent, setCountStudent] = useState(0)
    const [countRegistration, setCountRegistration] = useState(0)

    useEffect(() => {
        const user = getUser()
        const token = getToken()
        if(user === null) {
            props.history.push("/")
        } else {
            _countAdmin(token)
            _countTeacher(token)
            _countSubject(token)
            _countStudent(token)
            _countRegistration(token)
        }

    }, []);

    const _countAdmin = async (token) => {
        await axios.get(AdminApi.countAdmin(), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })
        .then((res) => {
            // console.log(res.data[0].admin)
            setCountAdmin(res.data[0].admin)
        })
        .catch((err) => {
            console.error(err)
        })
    };

    const _countTeacher = async (token) => {
        await axios.get(AdminApi.countTeacher(), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })
        .then((res) => {
            // console.log(res.data[0].teacher)
            setcountTeacher(res.data[0].teacher)
        })
        .catch((err) => {
            console.error(err)
        })
    };

    const _countStudent = async (token) => {
         await axios.get(AdminApi.countStudent(), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })
        .then((res) => {
            // console.log(res.data[0].student)
            setCountStudent(res.data[0].student)
        })
        .catch((err) => {
            console.error(err)
        })
    };

    const _countSubject = async (token) => {
        await axios.get(AdminApi.countSubject(), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })
        .then((res) => {
            // console.log(res.data[0].subject)
            setCountSubject(res.data[0].subject)
        })
        .catch((err) => {
            console.error(err)
        })
    };

    const _countRegistration = async (token) => {
        await axios.get(AdminApi.countRegistration(), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })
        .then((res) => {
            // console.log(res.data[0].registration)
            setCountRegistration(res.data[0].registration)
        })
        .catch((err) => {
            console.error(err)
        })
    };

    return (
        <Fragment>
            <AdminHeader props={props} />
            <div className="w-50 mx-auto mt-5">
                <ul className="list-group">
                    <li className="list-group-item">
                        <h1>
                            <div className="d-flex bd-highlight">
                                <div className="flex-grow-1 bd-highlight">Admin</div>
                                <div className="badge bg-secondary">{countAdmin}</div>
                            </div>
                        </h1>
                    </li>
                    <li className="list-group-item">
                        <h1>
                            <div className="d-flex bd-highlight">
                                <div className="flex-grow-1 bd-highlight">Teachers</div>
                                <div className="badge bg-secondary">{countTeacher}</div>
                            </div>
                        </h1>
                    </li>
                    <li className="list-group-item">
                        <h1>
                            <div className="d-flex bd-highlight">
                                <div className="flex-grow-1 bd-highlight">Students</div>
                                <div className="badge bg-secondary">{countStudent}</div>
                            </div>
                        </h1>
                    </li>
                    <li className="list-group-item">
                        <h1>
                            <div className="d-flex bd-highlight">
                                <div className="flex-grow-1 bd-highlight">Subjects</div>
                                <div className="badge bg-secondary">{countSubject}</div>
                            </div>
                        </h1>
                    </li>
                    <li className="list-group-item">
                        <h1>
                            <div className="d-flex bd-highlight">
                                <div className="flex-grow-1 bd-highlight">Registration</div>
                                <div className="badge bg-secondary">{countRegistration}</div>
                            </div>
                        </h1>
                    </li>
                </ul>
            </div>
        </Fragment>
    )
}

export default Admin
