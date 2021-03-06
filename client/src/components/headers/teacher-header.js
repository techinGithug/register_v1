import React, { Fragment, useState, useEffect, useContext } from 'react'
import AppContext from "../../context/appContext"
import { 
    IoLogOutOutline,
    IoSettingsOutline,
    IoPerson
} from "react-icons/io5"
import {
    NavLink
 } from "react-router-dom"

const TeacherHeader = ({ props }) => {
    const { getUser, logout } = useContext(AppContext)
    const [id, setId] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")

    useEffect(() => {
        const user = getUser()
        if(user === null) {
            props.history.push("/")
        } else {
            const { id, t_username, t_password, t_firstname, t_lastname } = user.userData
            setId(id)
            setUsername(t_username)
            setPassword(t_password)
            setFname(t_firstname)
            setLname(t_lastname)
        }
    }, []);

    const handleLogout = () => {
        logout()
        props.history.push("/")
    };

    return (
        <Fragment>
        <div className="bg-light"> 
            <nav className="navbar navbar-expand-lg navbar-light bg-light container">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Teacher</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="d-flex bd-highlight container">
                            <div className="flex-grow-1 bd-highlight">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName="is-active" to="/teacher">Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName="is-active" to="/teacher-subject">Subject</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName="is-active" to="/teacher-registration">Registration</NavLink>
                                    </li>
                                </ul>
                            </div>
                            {/* <div class="p-2 bd-highlight">Flex item</div> */}
                            <div className="bd-highlight">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item me-3">
                                        <NavLink className="nav-link" activeClassName="is-active" to="#"><IoPerson className="ics-1" /> {`${fname} ${lname}`}</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName="is-active" to="#"><IoSettingsOutline className="ics-1" /></NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName="is-active" to="/" onClick={() => handleLogout()}><IoLogOutOutline className="ics-2" /></NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </Fragment>
    )
}

export default TeacherHeader
