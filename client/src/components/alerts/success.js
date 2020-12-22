import React, { Fragment } from 'react'

const Success = ({ message }) => {
    return (
        <Fragment>
            <div className="alert alert-Success" role="alert">
                {message}
            </div>
        </Fragment>
    )
}

export default Success
