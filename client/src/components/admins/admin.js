import React, { Fragment, useEffect, useContext } from 'react'
import AppContext from "../../context/appContext"
import AdminHeader from "../headers/admin-header"

const Admin = (props) => {
    const { getUser } = useContext(AppContext)

    useEffect(() => {
        const user = getUser()
        if(user === null) {
            props.history.push("/")
        }
    }, [])

    return (
        <Fragment>
            <AdminHeader props={props} />
            <div className="w-50 mx-auto mt-5">
                <ul className="list-group">
                    <li className="list-group-item">
                        <h1>
                            <div className="d-flex bd-highlight">
                                <div className="flex-grow-1 bd-highlight">Teachers</div>
                                <div className="badge bg-secondary">23</div>
                            </div>
                        </h1>
                    </li>
                    <li className="list-group-item">
                        <h1>
                            <div className="d-flex bd-highlight">
                                <div className="flex-grow-1 bd-highlight">Students</div>
                                <div className="badge bg-secondary">68</div>
                            </div>
                        </h1>
                    </li>
                    <li className="list-group-item">
                        <h1>
                            <div className="d-flex bd-highlight">
                                <div className="flex-grow-1 bd-highlight">Subjects</div>
                                <div className="badge bg-secondary">24</div>
                            </div>
                        </h1>
                    </li>
                    <li className="list-group-item">
                        <h1>
                            <div className="d-flex bd-highlight">
                                <div className="flex-grow-1 bd-highlight">Registered</div>
                                <div className="badge bg-secondary">97</div>
                            </div>
                        </h1>
                    </li>
                </ul>
            </div>
        </Fragment>
    )
}

export default Admin
