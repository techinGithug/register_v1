import React, { Fragment } from 'react'

const InputText = ({ label, type, value, onChange, placeholder }) => {
    return (
        <Fragment>
            <div className="mb-3">
                <label className="form-label">{label}</label>
                <input 
                    type={type}
                    className="form-control"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required    
                />
            </div>
        </Fragment>
    )
}

export default InputText
