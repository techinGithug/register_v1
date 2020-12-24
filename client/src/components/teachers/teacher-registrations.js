import React, { Fragment, useState, useEffect, useContext} from 'react'
import axios from "axios"
import { 
    IoAddOutline
} from "react-icons/io5"
import AppContext from "../../context/appContext"
import TeacherHeader from "../headers/teacher-header"
import TeacherApi from "../../rest-api/teacher-api"
import AddModal from "../modal/add-modal"

const TeacherStudents = (props) => {
    const { getUser, getToken, teacherAddScore } = useContext(AppContext)
    const [registrationLists, setRegistrationLists] = useState([])
    const [isAdd, setIsAdd] = useState(false)

    useEffect(() => {
        init()
    }, []);

    useEffect(() => {
        if(isAdd) {
            init()
            setTimeout(() => {
                setIsAdd(false)
            }, 2000);
        }
    }, [isAdd]);

    const init = async () => {
        const token = getToken()
        const user = getUser()
        if(user === null) {
            props.history.push("/")

        } else {
            const { userData } = user
            await axios.get(TeacherApi.students(), {
                    params: {"id": userData.id},
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type':'application/json'
                    }
                })
                .then((res) => {
                    // console.log(res)
                    setRegistrationLists(res.data)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    };

    const handleSetRegistId = (data) => {
        teacherAddScore(data)
    };

    return (
        <Fragment>
        <AddModal 
            id="score" 
            title="Add score"
            setIsAdd={setIsAdd}
            token={getToken()}
            type="score"
        />
        <TeacherHeader props={props} />
        <div className="mx-auto w-50 mt-5 mb-3">
            <h5 className="text-center mb-3">Registrations</h5>
            <table className="table">
                <thead>
                    <tr className="text-center">
                        <th scope="col" width="100">Code</th>
                        <th scope="col" width="">Subject</th>
                        <th scope="col" width="50">Credit</th>
                        <th scope="col" width="">Student</th>
                        {/* <th scope="col" width="">Teacher</th> */}
                        <th scope="col" width="70">Score</th>
                        <th scope="col" width="50">Grade</th>
                        <th scope="col" width="50"></th>
                    </tr>
                </thead>
                <tbody>
                {registrationLists.map((item, index) => (
                    <tr key={item.id}>
                        <td>{item.sj_code}</td>
                        <td>{item.sj_name}</td>
                        <td className="text-center">{item.sj_credit}</td>
                        <td>{item.std_firstname} {item.std_lastname}</td>
                        {/* <td>{item.t_firstname} {item.t_lastname}</td> */}
                        <td className="text-center">{item.score === null ? 0 : item.score}</td>
                        <td className="text-center">{item.grade}</td>
                        <td>
                            <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#score" onClick={() => handleSetRegistId(item)}>
                                <IoAddOutline className="ics-1" />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>Focus the input</button> */}
        </div>
        </Fragment>
    )
}

export default TeacherStudents
