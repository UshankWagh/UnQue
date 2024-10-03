import React from 'react'
import { Link } from 'react-router-dom'

const Loader = ({ title, msg, redirectURL, redirectText }) => {
    return (
        <div className='loader'>
            <h1>{title}</h1>
            <h3>{msg}</h3>
            <Link to={redirectURL} className='btn'>{redirectText}</Link>
        </div>
    )
}

export default Loader