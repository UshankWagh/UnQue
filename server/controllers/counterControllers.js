import ShopOwner from "../models/ShopOwnerModel.js";
import Customer from "../models/CustomerModel.js";
import Queue from "../models/QueueModel.js";

// export const getShopCountersController = async (req, res) => {

//     const { shopId } = req.params;

//     try {

//         const shopOwner = await ShopOwner.findById(shopId).populate("shop.counters.queue");

//         const counters = shopOwner.shop.counters;

//         if (counters.length) {
//             return res.status(200).send({
//                 counters
//             })
//         }

//     } catch (error) {
//         res.status(500).send({
//             message: "error in get shop counters",
//             error
//         })
//     }

// }

export const deleteCounterController = async (req, res) => {

    const { shopId, counterNo } = req.params;

    try {

        const shopOwner = await ShopOwner.findByIdAndUpdate(shopId, { $pull: { "shop.counters": { "counterNo": counterNo } } })

        let queueId = shopOwner.shop.counters.find(counter => counter.counterNo == counterNo).queue

        await Queue.findByIdAndDelete(queueId)

        res.status(200).send({
            success: true,
            message: "Counter deleted successfully"
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in delete counter",
            error
        })
    }
}

export const addCounterController = async (req, res) => {

    const { shopName, shopId, counterNo } = req.params;

    try {

        const newQueue = new Queue({
            shopownerId: shopId,
            shopName,
            counterNo,
            isOpen: false,
            queueCount: 0,
            firstTicket: 100,
            lastTicket: 100,
            cancelledTickets: []
        });

        await newQueue.save()

        const shopOwner = await ShopOwner.findByIdAndUpdate(shopId, { $push: { "shop.counters": { counterNo, queue: newQueue._id } } })

        res.status(200).send({
            success: true,
            message: "Counter added successfully",
            queue: newQueue
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in add Counter",
            error
        })
    }
}

export const getCounterQueueController = async (req, res) => {

    const { shopId, counterNo } = req.params;

    try {

        const shopOwner = await ShopOwner.findById(shopId).populate("shop.counters.queue");

        const counter = shopOwner.shop.counters.find(counter => counter.counterNo == counterNo)

        if (counter) {
            return res.status(200).send({
                success: true,
                queue: counter.queue
            });
        }

        res.status(200).send({
            success: false,
            message: "No counter found"
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in get counter queue",
            error
        })
    }
}

export const getJoinedQsController = async (req, res) => {

    const { filter, customerid } = req.params;
    // console.log("cid", customerid);

    try {
        let customer;
        if (filter == "ids") {
            customer = await Customer.findById(customerid, { "queues.queue": 1 });
        }
        else if (filter == "all") {
            customer = await Customer.findById(customerid, { "queues": 1 }).populate("queues.queue");
        }
        // console.log(customer);

        res.status(200).send({
            success: true,
            message: "customer found",
            joinedQs: customer.queues
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in get joined qs",
            error
        })
    }
}

export const JoinQueueController = async (req, res) => {

    const { queueId, customerId } = req.body;

    try {
        const queue = await Queue.findById(queueId);
        // console.log("q", queue);

        if (queue.isOpen) {
            const customer = await Customer.findById(customerId);
            // console.log(queueId, customer.queues);

            queue.lastTicket += 1;
            queue.queueCount += 1;
            customer.queues.push({
                ticket: queue.lastTicket,
                queue: queueId
            });
            queue.save();
            customer.save();

            res.status(200).send({
                success: true,
                message: "joined q",
                queue: {
                    queueCount: queue.queueCount,
                    lastTicket: queue.lastTicket,
                }
            });
            // console.log(queue, customer);
        }
        else {
            // console.log("counter closed");
            res.status(200).send({
                success: true,
                message: "Counter closed!!",
            });
        }

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in joining q",
            error
        })
    }
}

export const cancelTicketController = async (req, res) => {

    const { queueId, customerId } = req.body;
    console.log(queueId, customerId);

    try {

        const queue = await Queue.findById(queueId);
        const customer = await Customer.findById(customerId);
        const joinedQ = customer.queues.filter(queue => queue.queue == queueId)[0];
        console.log("jq", joinedQ, queueId);

        if (joinedQ) {
            let { firstTicket, lastTicket } = queue;
            let ticketType = ""
            const cancelTicket = joinedQ.ticket;
            if (cancelTicket != firstTicket && cancelTicket != lastTicket) {
                ticketType = "m-ticket";
                queue.cancelledTickets.push(cancelTicket);
            }
            else if (cancelTicket == firstTicket) {
                ticketType = "f-ticket";
                firstTicket += 1;
                let i = 0;
                // ft = 102
                // cl = [102,103,104,106]
                while (queue.cancelledTickets[i] == firstTicket) {
                    firstTicket += 1
                    i += 1
                }
                queue.firstTicket = firstTicket;
            }
            else if (cancelTicket == lastTicket) {
                ticketType = "l-ticket";
                lastTicket -= 1;
                let i = cancelTicket.length - 1;
                // lt = 107
                // cl = [102,104,105,106]
                while (queue.cancelledTickets[i] == lastTicket) {
                    lastTicket -= 1
                    i -= 1
                }
                queue.lastTicket = lastTicket;
            }
            queue.queueCount -= 1;
            customer.queues = customer.queues.filter(queue => queue.queue != queueId);
            console.log(queue, customer);

            queue.save();
            customer.save();

            res.status(200).send({
                ticketType,
                canceledTicket: cancelTicket,
                queueCount: queue.queueCount,
                success: true,
                message: "canceled ticket",
            });
        }
        else {
            res.status(200).send({
                success: true,
                message: "ticket not found",
            });
        }

    } catch (error) {
        console.log("er", error);

        res.status(500).send({
            success: false,
            message: "error in canceling ticket",
            error
        })
    }
}


export const removeTicketController = async (req, res) => {

    const { queueId, ticket, isLastTicket } = req.body;

    try {

        let updateQuery

        if (isLastTicket) {
            updateQuery = { firstTicket: 101, lastTicket: 100, queueCount: 0, cancelledTickets: [] }
        }
        else {
            updateQuery = { firstTicket: ticket, $inc: { queueCount: -1 } }
        }

        const queue = await Queue.findByIdAndUpdate(queueId, updateQuery);

        if (queue) {
            return res.status(200).send({
                success: true
            });
        }

        res.status(200).send({
            success: false,
            message: "No Queue found"
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in get counter queue",
            error
        })
    }
}

export const openCloseQueueController = async (req, res) => {

    const { queueId, isOpen } = req.body;

    try {

        const queue = await Queue.findByIdAndUpdate(queueId, { isOpen });

        if (queue) {
            return res.status(200).send({
                success: true,
                message: "open"
            });
        }

        res.status(200).send({
            success: false,
            message: "No Queue found"
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in get counter queue",
            error
        })
    }
}