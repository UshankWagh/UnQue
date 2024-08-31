import React from 'react'

const DropDown = ({ label, values, onSelect }) => {
    return (
        <div className='dropdown'>
            <label htmlFor="selc">{label}</label>
            <select id='selc' onChange={(e) => { onSelect && onSelect(e.target.value) }}>
                {values?.map(val => {
                    return <option key={val._id || val} value={val._id || val}>{val.name || val}</option>
                })}
            </select>
        </div>
    )
}

export default DropDown