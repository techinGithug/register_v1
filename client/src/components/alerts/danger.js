import React, { Fragment } from 'react'

const Danger = ({ message }) => {
    return (
        <Fragment>
            <div className="alert alert-danger" role="alert">
                {message}
            </div>
        </Fragment>
    )
}

export default Danger
