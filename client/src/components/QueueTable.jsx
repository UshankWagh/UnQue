import React from 'react'
import { Link } from 'react-router-dom';

const QueueTable = () => {
    return (
        <>
            <div className="sub-head queues-head">Currently joined Queues </div>
            {/* <table className='queue-table' cellSpacing='0'>
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
            </table > */}
            <div className="queue-th">
                <div className="queue-head">Shop Name</div>
                <div className="queue-head">Counter No.</div>
                <div className="queue-head">Ticket</div>
                <div className="queue-head">Queue Count</div>
                <div className="queue-head">Action</div>
            </div>
            <div className="queue-box">
                <div className="queue-val">Phonix Shop</div>
                <div className="queue-val">4</div>
                <div className="queue-val">52</div>
                <div className="queue-val">23</div>
                <div className="queue-val"><Link to="/shop" className='btn view-shop-btn'>View Shop</Link></div>
            </div>
            <div className="queue-box">
                <div className="queue-val">Phonix Shop</div>
                <div className="queue-val">4</div>
                <div className="queue-val">52</div>
                <div className="queue-val">23</div>
                <div className="queue-val"><Link to="/shop" className='btn view-shop-btn'>View Shop</Link></div>
            </div>
            <div className="queue-box">
                <div className="queue-val">Phonix Shop</div>
                <div className="queue-val">4</div>
                <div className="queue-val">52</div>
                <div className="queue-val">23</div>
                <div className="queue-val"><Link to="/shop" className='btn view-shop-btn'>View Shop</Link></div>
            </div>
            <div className="queue-box">
                <div className="queue-val">Phonix Shop</div>
                <div className="queue-val">4</div>
                <div className="queue-val">52</div>
                <div className="queue-val">23</div>
                <div className="queue-val"><Link to="/shop" className='btn view-shop-btn'>View Shop</Link></div>
            </div>
            <div className="queue-box">
                <div className="queue-val">Phonix Shop</div>
                <div className="queue-val">4</div>
                <div className="queue-val">52</div>
                <div className="queue-val">23</div>
                <div className="queue-val"><Link to="/shop" className='btn view-shop-btn'>View Shop</Link></div>
            </div>
        </>
    )
}

export default QueueTable