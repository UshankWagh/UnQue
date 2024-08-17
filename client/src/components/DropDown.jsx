import React from 'react'

const DropDown = ({ label, values }) => {
    return (
        <div className='dropdown'>
            <label htmlFor="selc">{label}</label>
            <select id='selc'>
                {values.map(val => {
                    return <option value="val">{val}</option>
                })}
            </select>
        </div>
    )
}

export default DropDown