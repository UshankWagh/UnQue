import ShopOwner from "../models/ShopOwnerModel.js"

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

export const getShopCounterController = async (req, res) => {

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

export const getDeleteCounterController = async (req, res) => {

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

export const getAddCounterController = async (req, res) => {

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
