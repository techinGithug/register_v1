import React, { Fragment } from 'react'

const Select = ({ label, datas, value, onChange }) => {
    return (
       <Fragment>
            <div className="mb-3">
                <label className="form-label">{label}</label>
                <select 
                    className="form-select"
                    value={value}
                    onChange={onChange}
                >
                    {datas.map((item) => (
                        <option key={item.id} value={item.label}>{item.label}</option>
                    ))}
                </select>
            </div>
       </Fragment>
    )
}

export default Select
