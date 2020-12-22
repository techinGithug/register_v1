import React, { Fragment, useEffect, useState, useContext } from 'react'
import AppContext from "../../context/appContext"
import { 
    IoLogOutOutline
} from "react-icons/io5"
import {
   NavLink
  } from "react-router-dom"

const AdminHeader = ({ props }) => {
    const { getUser, logout } = useContext(AppContext)
    const [user, setUser] = useState([])

    useEffect(() => {
        const user = getUser()
        if(user === null) {
            props.history.push("/")
        } else {
            setUser(user)
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
                    <a className="navbar-brand" href="#">Admin</a> {/* {`Admin ${user.userData.am_firstname} ${user.userData.am_lastname} `} */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="d-flex bd-highlight container">
                            <div className="flex-grow-1 bd-highlight">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link"
                                            activeClassName="is-active"
                                            to="/admin"
                                        >
                                            Home
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName="is-active" to="/admin-teacher" >Teachers</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName="is-active" to="/admin-student">Students</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName="is-active" to="/admin-subject">Subjects</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName="is-active" to="#">Registers</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName="is-active" to="#">Settings</NavLink>
                                    </li>
                                </ul>
                            </div>
                            {/* <div class="p-2 bd-highlight">Flex item</div> */}
                            <div className="bd-highlight">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" onClick={() => handleLogout()}><IoLogOutOutline className="ics-2" /></a>
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

export default AdminHeader
