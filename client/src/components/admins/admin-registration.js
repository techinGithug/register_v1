import React, { Fragment, useContext, useEffect, useState } from 'react'
import axios from "axios"
import { 
    IoTrashOutline,
    IoSearchOutline
 } from "react-icons/io5";
import AdminApi from "../../rest-api/admin-api"
import AppContext from "../../context/appContext"
import AdminHeader from "../headers/admin-header"
// import AddModal from "../../components/modal/add-modal"
import DeleteModal from "../../components/modal/delete-modal"

const AdminRegistration = (props) => {
    const { getUser, getToken } = useContext(AppContext)
    const [registrationLists, setRegistrationLits] = useState([])
    const [registId, setRegistId] = useState("")
    const [student, setStudent] = useState("")
    const [isDelete, setIsDelete] = useState(false)

    useEffect(() => {
        init()
    }, []);

    useEffect(() => {
        if(isDelete) {
            init()
            setTimeout(() => {
                setIsDelete(false)
            }, 2000);
        }
        
    }, [isDelete]);

    const init = async () => {
        const user = getUser()
        if(user === null) {
            props.history.push("/")
        } else {
            const token = getToken()
            await axios.get(AdminApi.getAllRegistration(), {
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
                    setRegistrationLits(data)

                } else if(data.length === 0) {
                    console.log(data)
                }
            })
            .catch((err) => {
                console.error(err)
            })
        }
    };

    const handleSearchRegistration = (e) => {
        e.preventDefault()
        console.log("Search registration...")
        
    };

    return (
        <Fragment>
        {/* <DeleteModal 
            id="deleteRegistration" 
            id_={registId}
            title="Delete registration"
            setIsDelete={setIsDelete}
            token={getToken()}
            body="Are your sure to delete this registration!"
            type="registration"
        /> */}
        <AdminHeader props={props} />
        <div className="container w-50 mt-3 mb-5">
            <div className="w-50 mx-auto mb-3">
                <form className="d-flex" onSubmit={(e) => handleSearchRegistration(e)}>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={student} onChange={(e) => setStudent(e.target.value)} 
                        placeholder="Student"
                        required
                    />
                    <button className="btn btn-sm btn-primary ms-1" type="submit"><IoSearchOutline className="ics-1" /></button>
                </form>
            </div>
            <h5 className="text-center mb-3 fw-bold">Registration</h5>
            <table className="table">
                <thead>
                    <tr className="text-center">
                        <th scope="col" width="100">Code</th>
                        <th scope="col" width="">Subject</th>
                        <th scope="col" width="50">Credit</th>
                        <th scope="col" width="">Student</th>
                        <th scope="col" width="">Teacher</th>
                        <th scope="col" width="50">Score</th>
                        <th scope="col" width="50">Grade</th>
                        {/* <th scope="col" width="50"></th> */}
                    </tr>
                </thead>
                <tbody>
                {registrationLists.map((item) => (
                    <tr key={item.id}>
                        <td>{item.sj_code}</td>
                        <td>{item.sj_name}</td>
                        <td className="text-center">{item.sj_credit}</td>
                        <td>{item.std_firstname} {item.std_lastname}</td>
                        <td>{item.t_firstname} {item.t_lastname}</td>
                        <td className="text-center">{item.score}</td>
                        <td className="text-center">{item.grade}</td>
                        {/* <td>
                            <button type="button" className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteRegistration" onClick={() => setRegistId(item.id)}>
                                <IoTrashOutline className="ics-1" />
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

export default AdminRegistration
