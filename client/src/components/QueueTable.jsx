import React from 'react'
import { Link } from 'react-router-dom';

const QueueTable = () => {
    return (
        <>
            <div className="sub-head queues-head">Currently joined Queues </div>
            <table className='queue-table' cellSpacing='0'>
                <tr>
                    <th>Shop Name</th>
                    <th>Counter No.</th>
                    <th>Ticket</th>
                    <th>Queue Position</th>
                    <th>Queue Count</th>
                    <th>Action</th>
                </tr>
                <tr>
                    <td>Phonix Food Court</td>
                    <td>23</td>
                    <td>23</td>
                    <td>23</td>
                    <td>23</td>
                    <td><Link to="/shop" className='btn view-shop-btn'>View Shop</Link></td>
                </tr>
                <tr>
                    <td>WFC Food Court</td>
                    <td>23</td>
                    <td>23</td>
                    <td>23</td>
                    <td>23</td>
                    <td><Link to="/shop" className='btn view-shop-btn'>View Shop</Link></td>
                </tr>
                <tr>
                    <td>F. R. Juice Center</td>
                    <td>23</td>
                    <td>23</td>
                    <td>23</td>
                    <td>23</td>
                    <td><Link to="/shop" className='btn view-shop-btn'>View Shop</Link></td>
                </tr>
            </table >
        </>
    )
}

export default QueueTable