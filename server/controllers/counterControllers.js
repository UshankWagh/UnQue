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
            firstTicket: 101,
            lastTicket: 101,
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

    const { customerid } = req.params;
    // console.log("cid", customerid);

    try {
        const customer = await Customer.findById(customerid, { "queues.queue": 1 });

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