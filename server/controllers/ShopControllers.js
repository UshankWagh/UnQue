import ShopOwner from "../models/ShopOwnerModel.js"
import Queue from "../models/QueueModel.js"

export const getShopDetailsController = async (req, res) => {

    try {

        const { shopId } = req.params

        const shopOwner = await ShopOwner.findById(shopId).populate("shop.counters.queue")

        // .populate("shop.employees");

        const shop = shopOwner.shop;

        if (shop) {
            return res.status(200).send({
                success: true,
                shop
            })
        }

        res.status(200).send({
            success: false,
            message: "No Shop Found"
        })


    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: "error in get shop details",
            error
        })
    }

}