import React, { Fragment, useEffect, useState, useContext } from 'react'
import axios from "axios"
import AppContext from "../../context/appContext"
import StudentHeader from "../headers/student-header"
import StudentApi from "../../rest-api/student-api"

const Student = (props) => {
    const { getUser, getToken } = useContext(AppContext)
    const [registrationLists, setRegistrationLits] = useState([])
    const [gpa, setGpa] = useState("")

    useEffect(() => {
        init()
    }, []);

    const init = async () => {
        const user = getUser()
        if(user === null) {
            props.history.push("/")
        } else {
            const { id } = getUser().userData
            const token = getToken()
            await axios.get(StudentApi.getSchoolRecord(), {
                params: {"id":id},
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
                    calGpa(data)
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

    const calGpa = (data) => {
        // Fomular for calculation GPA
        // [(grade*credit)+(grade*credit)*(grade*credit)...n] 
        //     subject1       subject2        subject3
        
        // Assume
        // subject grade  -> (3 x 2) + (3.5 x 1) + (4 x 1.5)  =  6 + 3.5 + 6  =  15.5
        // subject credit -> 15.5 / (2 + 1 + 1.5)  =  15.5/4.5
        let sumGrade = 0.0
        let sumCredit = 0.0
        let sumGpa = 0.0
        data.map((item) => {
            let grade_ = parseFloat(item.grade_)
            let credit = parseFloat(item.sj_credit)
            sumGrade += (grade_*credit)
            sumCredit += (parseFloat(item.sj_credit))
        });
        sumGpa = (sumGrade/sumCredit)
        setGpa(sumGpa.toFixed(2))
    };

    return (
        <Fragment>
        <StudentHeader props={props} />
        <div className="w-50 mx-auto mt-5 mb-3">
            <h5 className="text-center mb-3 fw-bold">Academic results</h5>
            <div className="d-flex justify-content-end my-2 fw-bold"><span className="badge bg-secondary">GPA: {gpa}</span></div>
            <table className="table">
                <thead>
                    <tr className="text-center">
                        <th scope="col" width="100">Code</th>
                        <th scope="col" width="">Subject</th>
                        <th scope="col" width="50">Credit</th>
                        {/* <th scope="col" width="">Student</th> */}
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
                        {/* <td>{item.std_firstname} {item.std_lastname}</td> */}
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

export default Student
