import React, { Fragment } from 'react'

const Select = ({ label, datas, value, onChange, type }) => {
    const renderBody = () => {
        if(type === "type") {
            return (
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
            );
        };

        if(type === "teacher") {
            return (
                <div className="mb-3">
                    <label className="form-label">{label}</label>
                    <select 
                        className="form-select"
                        value={value}
                        onChange={onChange}
                    >
                        {datas.map((item) => (
                            <option key={item.id} value={item.id}>{item.t_firstname} {item.t_lastname}</option>
                        ))}
                    </select>
                </div>
            )
        };
    };

    return (
       <Fragment>
            {renderBody()}
       </Fragment>
    )
}

export default Select
