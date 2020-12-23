import React, { Fragment } from 'react'

const Warning = ({ message }) => {
    return (
        <Fragment>
            <div className="alert alert-warning" role="alert">
                {message}
            </div>
        </Fragment>
    )
}

export default Warning
