import React, { useEffect, useMemo, useState } from 'react'
import DropDown from './DropDown'
import { io } from "socket.io-client";
import axios from 'axios';

const UpdateWaitTime = ({ shopCounters }) => {
    const [queueId, setQueueId] = useState();
    const [minWaitTime, setMinWaitTime] = useState();
    const [counters, setCounters] = useState([]);

    const [socketID, setSocketId] = useState("");

    const socket = useMemo(
        () =>
            io(`${import.meta.env.VITE_SERVER_URL}`, {
                withCredentials: true,
            }),
        []
    );

    useEffect(() => {
        socket.on("connect", () => {
            setSocketId(socket.id);
            console.log("connected", socket.id);
        });

        let countersList = shopCounters?.map(counter => {
            let obj = {};
            obj.name = counter.counterNo;
            obj._id = counter.queue._id;
            obj.minWaitTime = counter.queue.minWaitTime;
            return obj;
        });
        setCounters(countersList);
        setQueueId(countersList[0]?._id);
        setMinWaitTime(countersList[0]?.minWaitTime);

    }, [shopCounters]);


    console.log(shopCounters, minWaitTime);


    function updateQueId(queId) {
        setQueueId(queId);
        setMinWaitTime(() => {
            let cntr = counters.filter(counter => counter._id == queId);
            return cntr[0].minWaitTime;
        });
    }

    function updateWaitTime(time) {
        setMinWaitTime(time);
    }
    console.log("qm", queueId, minWaitTime);


    let onSubmit = async () => {
        console.log(queueId, minWaitTime);
        const resp = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/counters/queue/update-min-wait-time`, { queueId, minWaitTime });

        if (resp.data.success) {
            console.log("emit");
            socket.emit("update-wait-time", { queueId, minWaitTime });
        }
        else {
            alert(resp.data.message);
        }

    }

    return (
        <div className='update-wait-time'>
            <div className="head-text">Update/Set Minimum wait time</div>
            <div className="txt">The Minimum time required by counters to attend a customer and take order</div>
            <div className="wait-time-inps">
                <div className="inp">
                    <DropDown label={"Counter No. to Update:"} values={counters} onSelect={updateQueId} />
                </div>
                <div className="inp time-inp">
                    <label htmlFor="counter">Minimum Wait Time:</label>
                    <input type="number" name="counter" id="counter" value={minWaitTime || 0} onChange={(e) => updateWaitTime(e.target.value)} placeholder='Wait Time (Minutes)' />
                </div>
                <div className="inp">
                    <button className='btn update-btn' type='submit' onClick={onSubmit}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateWaitTime