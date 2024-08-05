import React from 'react'
import '../styles/Shop.css'
import QueueTable from '../components/QueueTable'

const Queues = () => {
    return (
        <div className='queues'>
            <h1>Queues</h1>
            <div className="queues-list">
                <QueueTable />
            </div>
        </div>
    )
}

export default Queues