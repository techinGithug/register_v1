import React, { Fragment, useEffect, useContext } from 'react'
import AppContext from "../../context/appContext"
import { 
    IoHomeOutline,
    IoLogOutOutline,
    IoSettingsOutline
} from "react-icons/io5"

const StudentHeader = ({ props }) => {
    const { getUser, logout } = useContext(AppContext)

    useEffect(() => {
        const user = getUser()
        if(user === null) {
            props.history.push("/")
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
                    <a className="navbar-brand" href="#">Student</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="d-flex bd-highlight container">
                            <div className="flex-grow-1 bd-highlight">
                                {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link" aria-current="page" href="#"><IoHomeOutline /></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#"><IoSettingsOutline /></a>
                                    </li>
                                </ul> */}
                            </div>
                            {/* <div class="p-2 bd-highlight">Flex item</div> */}
                            <div className="bd-highlight">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" onClick={() => handleLogout()}><IoLogOutOutline /></a>
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

export default StudentHeader