// import user from "../../models/user";
import Customer from "../models/CustomerModel.js";
import ShopOwner from "../models/ShopOwnerModel.js";
import Employee from "../models/EmployeeModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

// create token with user id
const createToken = (_id) => {
    // expiresIn is set to 1 day
    // JWT_SECRET is a secret string that is used to sign the token
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// controller function to register users

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, role, email, username, password, state, city, area } = req.body;
        let customerDets = undefined;
        let shopOwnerDets = undefined;

        let isEmptyField = false;
        let exists = false;

        if (role == "customer") {
            const { phoneNo } = req.body;
            isEmptyField = !firstName || !lastName || !email || !phoneNo || !state || !city || !area || !username || !password;
            exists = await Customer.findOne({ username });
            customerDets = {
                firstName,
                lastName,
                email: {
                    notifyMe: true,
                    emailId: email
                },
                phone: {
                    notifyMe: true,
                    phoneNo
                },
                state,
                city,
                area,
                username,
            }
        }
        else if (role == "shopowner") {
            const { shopName, counters } = req.body;
            isEmptyField = !firstName || !lastName || !shopName || !counters || !state || !city || !area || !email || !username || !password;
            exists = await ShopOwner.findOne({ username });
            let countersArr = [];
            for (let i = 1; i < counters; i++) {
                countersArr.push({
                    counterNo: i,
                    queId: ""
                });
            }
            shopOwnerDets = {
                firstName,
                lastName,
                username,
                shop: {
                    shopName,
                    state,
                    city,
                    area,
                    counters: countersArr
                }
            }
        }

        if (isEmptyField) {
            throw Error("Please fill all the fields");
        }
        if (!validator.isEmail(email.emailId || email)) {
            throw Error("Email is not valid");
        }
        if (!validator.isStrongPassword(password)) {
            throw Error("Password is not strong enough");
        }
        if (exists) {
            throw Error("Username already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser = undefined

        if (role == "customer") {
            newUser = new Customer({
                ...customerDets,
                password: hashedPassword,
            });
        }
        else if (role == "shopowner") {
            newUser = new ShopOwner({
                ...shopOwnerDets,
                password: hashedPassword,
            });
        }

        const newentry = await newUser.save();
        const token = createToken(newentry._id);

        res.status(201).json({
            auth: {
                role,
                id: newentry._id,
                name: `${newentry.firstName} ${newentry.lastName}`,
                username: newentry.username,
                token: token,
            }
        });

    } catch (error) {
        // Check if it's a validation error
        if (error instanceof Error) {
            console.log(error);
            res.status(400).json({
                status: "400 Bad Request",
                message: error.message,
            });
        } else {
            // Handle internal server errors
            console.error("Internal Server Error:", error);

            res.status(500).json({
                status: "500 Internal Server Error",
                message: "500 Internal Server Error, User not created",
            });
        }
    }
};

export const loginUser = async (req, res) => {
    try {
        let login = false
        const { role } = req.body;
        console.log("rl", role);

        if (role == "customer") {
            login = await Customer.findOne({
                username: req.body.username,
            });
        }
        else if (role == "shopowner") {
            console.log("shpc", req.body.username);

            login = await ShopOwner.findOne({
                username: req.body.username,
            });
        }
        else if (role == "employee") {
            console.log("empc", req.body.username);

            login = await Employee.findOne({
                username: req.body.username,
            });
        }

        if (!login) {
            res.status(404).json({
                message: "Username not found",
            });
            return;
        }

        // const validPassword = await bcrypt.compare(
        //     req.body.password,
        //     login.password
        // );
        const validPassword = req.body.password == login.password ? true : false;

        if (!validPassword) {
            res.status(400).json({
                message: "Invalid password",
            });
            return;
        }

        const token = createToken(login._id);

        res.status(200).json({
            auth: {
                role,
                id: login._id,
                name: `${login.firstName} ${login.lastName}`,
                username: login.username,
                token: token,
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "500 Internal Server Error",
            message: "500 Internal Server Error, User not logged in",
        });
    }
};
