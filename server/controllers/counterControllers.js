import ShopOwner from "../models/ShopOwnerModel.js";
import Customer from "../models/CustomerModel.js";

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

export const getCounterController = async (req, res) => {

    const { shopId, counterNo } = req.params;

    try {

        const shopOwner = await ShopOwner.findById(shopId).populate("shop.counters.queue");

        const counter = shopOwner.shop.counters.find(counter => counter.counterNo == counterNo)

        if (counter) {
            return res.status(200).send({
                success: true,
                counter
            });
        }

        res.status(200).send({
            success: false,
            message: "No counter found"
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in get shop counters",
            error
        })
    }
}

export const deleteCounterController = async (req, res) => {

    const { shopId, counterNo } = req.params;

    try {

        const shopOwner = await ShopOwner.findByIdAndUpdate(shopId, { $pull: { "shop.counters": { "counterNo": counterNo } } })

        res.status(200).send({
            success: true,
            message: "Counter deleted successfully"
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in get shop counters",
            error
        })
    }
}

export const addCounterController = async (req, res) => {

    const { shopId, counterNo } = req.params;

    try {

        const shopOwner = await ShopOwner.findByIdAndUpdate(shopId, { $pull: { "shop.counters": { "counterNo": counterNo } } })

        res.status(200).send({
            success: true,
            message: "Counter deleted successfully"
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in get shop counters",
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
        console.log(customer);

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
