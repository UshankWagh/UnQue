import ShopOwner from "../models/ShopOwnerModel.js"
import Employee from "../models/EmployeeModel.js"
import Customer from "../models/CustomerModel.js"

export const getProfileDetailsController = async (req, res) => {

    try {

        const { role, id } = req.params;

        let profileDets = {}

        if (role == "customer") {

            const customer = await Customer.findById(id, "-username -password -queues");

            if (!customer) {
                return res.status(200).send({
                    success: false,
                    message: "Customer not found"
                });
            }
            profileDets = customer

        }
        else if (role == "shopowner") {

            const shopOwner = await ShopOwner.findById(id, "-username -password -shop.counters -shop.employees");

            if (!shopOwner) {
                return res.status(200).send({
                    success: false,
                    message: "ShopOwner not found"
                });
            }
            profileDets = shopOwner

        }
        else if (role == "employee") {

            const employee = await Employee.findById(id, "-username -password -shopId");

            if (!employee) {
                return res.status(200).send({
                    success: false,
                    message: "Employee not found"
                });
            }
            profileDets = employee

        }
        else {
            return res.status(200).send({
                success: false,
                message: "No such user role"
            });
        }

        res.status(200).send({
            success: true,
            profileDets
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error
        });
    }

}