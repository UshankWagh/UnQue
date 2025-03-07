import ShopOwner from "../models/ShopOwnerModel.js"
import Employee from "../models/EmployeeModel.js"

export const getShopDetailsController = async (req, res) => {

    try {

        let { role, id } = req.params;

        let counterNo; // Just for employee
        if (role == "employee") {
            const employee = await Employee.findById(id)
            id = employee.shopownerId
            counterNo = employee.counterNo;
        }

        const shopOwner = await ShopOwner.findById(id).populate("shop.counters.queue shop.employees")
        // .populate("shop.employees");

        const shop = shopOwner.shop;

        if (shop) {
            return res.status(200).send({
                success: true,
                shopId: shopOwner._id,
                shopOwnerName: shopOwner.firstName + " " + shopOwner.lastName,
                shop,
                counterNo
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

export const getStatesController = async (req, res) => {
    try {
        const resp = await State.find({});
        // console.log(resp);

        res.status(200).send({
            status: true,
            message: "States found",
            states: resp
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: true,
            message: "error in getting States",
            error
        });
    }
}

export const getCitiesController = async (req, res) => {
    try {
        const { stateid } = req.params;
        const resState = await State.findOne({ _id: stateid });
        // console.log(stateid, resState);

        const resCities = await City.find({ _id: { $in: resState.cities } })
        // console.log(resCities);

        res.status(200).send({
            status: true,
            message: "City found",
            state: resState.name,
            cities: resCities
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: true,
            message: "error in getting City",
            error
        });
    }
}

export const getShopsController = async (req, res) => {
    try {
        const { state, city, shopKeyword } = req.body;
        const stateRegex = new RegExp(state, "i");
        const cityRegex = new RegExp(city, "i");
        const shopRegex = new RegExp(shopKeyword, "i");


        // Query to fetch shops based on state, city, and partial match of shop name
        const shops = await ShopOwner.find({
            'shop.state': { $regex: stateRegex },
            'shop.city': { $regex: cityRegex },
            'shop.shopName': { $regex: shopRegex }, // Case-insensitive search
        });

        console.log(shops);
        res.status(200).send({
            status: true,
            message: "Shops found",
            shops
        });

        // const { state, city, area } = req.params;
        // const shopsRes = await ShopOwner.find({ "shop.state": state, "shop.city": city, "shop.area": area }, { firstName: 1, lastName: 1, "shop.shopName": 1, "shop.shopImg": 1, "shop.address": 1 });
        // // console.log(shopsRes);

        // res.status(200).send({
        //     status: true,
        //     message: "Shops found",
        //     shops: shopsRes
        // });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: true,
            message: "error in getting Shops",
            error
        });
    }
}

export const getShopController = async (req, res) => {
    try {
        const { shopid } = req.params;
        const shopRes = await ShopOwner.findOne({ _id: shopid }, { username: 0, password: 0, "shop.employees": 0 }).populate("shop.counters.queue");
        // console.log(shopRes);

        res.status(200).send({
            status: true,
            message: "Shop found",
            shop: shopRes
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: true,
            message: "error in getting Shop",
            error
        });
    }
}
