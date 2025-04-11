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
        let message = "";

        let isEmptyField = false;
        let exists = false;

        if (role == "customer") {
            const { phoneNo, phoneNotify, emailNotify } = req.body;
            isEmptyField = !firstName || !lastName || !email || !phoneNo || !state || !city || !area || !username || !password;
            exists = await Customer.findOne({ username });
            customerDets = {
                firstName,
                lastName,
                email: {
                    notifyMe: emailNotify,
                    emailId: email
                },
                phone: {
                    notifyMe: phoneNotify,
                    phoneNo
                },
                state,
                city,
                area,
                username,
            }
        }
        else if (role == "shopowner") {
            const { shopName } = req.body;
            isEmptyField = !firstName || !lastName || !shopName || !state || !city || !area || !email || !username || !password;
            exists = await ShopOwner.findOne({ username });
            // let countersArr = [];
            // for (let i = 1; i < counters; i++) {
            //     countersArr.push({
            //         counterNo: i,
            //         queId: ""
            //     });
            // }
            shopOwnerDets = {
                firstName,
                lastName,
                username,
                email,
                shop: {
                    shopName,
                    state,
                    city,
                    area,
                    // counters: countersArr
                }
            }
        }

        if (isEmptyField) {
            message = "Please fill all the required fields";
        }
        else if (!validator.isEmail(email.emailId || email)) {
            message = "Email is not valid";
        }
        else if (!validator.isStrongPassword(password)) {
            message = "Password is not strong enough";
        }
        else if (exists) {
            message = "Username already exists";
        }

        if (message != "") {
            return res.status(200).send({
                success: false,
                message
            })
        }

        const salt = await bcrypt.genSalt(10);
        // UNCOMMENT BELLOW LINE TO ENCRYPT PASSWORD BEFORE STORING AND REMOVE THE NEXT LINE.
        // const hashedPassword = await bcrypt.hash(password, salt);
        const hashedPassword = password;

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

        res.status(200).send({
            auth: {
                role,
                id: newentry._id,
                name: `${newentry.firstName} ${newentry.lastName}`,
                username: newentry.username,
                token: token,
            },
            success: true
        });

    } catch (error) {
        // Check if it's a validation error
        if (error instanceof Error) {
            console.log(error);
            res.status(400).send({
                status: "400 Bad Request",
                message: error.message,
                success: false
            });
        } else {
            // Handle internal server errors
            console.error("Internal Server Error:", error);
            res.status(500).send({
                status: "500 Internal Server Error",
                message: "500 Internal Server Error, User not created",
                success: false
            });
        }
    }
};

export const loginUser = async (req, res) => {
    try {
        let login = false
        let message = ""
        const { role, username, password } = req.body;

        if (!username || !password) {
            return res.status(200).send({
                message: "Username or Password field is Empty",
                success: false
            });
        }

        if (role == "customer") {
            login = await Customer.findOne({
                username: username,
            });
        }
        else if (role == "shopowner") {
            login = await ShopOwner.findOne({
                username: username,
            });
        }
        else if (role == "employee") {
            login = await Employee.findOne({
                username: username,
            });
        }

        if (!login) {
            return res.status(200).send({
                message: "Username not found",
                success: false
            });
        }

        // UNCOMMENT BELLOW LINE TO CHECK ENCRYPTED PASSWORD
        // const validPassword = await bcrypt.compare(
        //     password,
        //     login.password
        // );
        const validPassword = password == login.password;

        if (!validPassword) {
            return res.status(200).send({
                message: "Password Incorrect",
                success: false
            });
        }

        const token = createToken(login._id);

        res.status(200).send({
            auth: {
                role,
                id: login._id,
                name: `${login.firstName} ${login.lastName}`,
                username: login.username,
                token: token,
            },
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "500 Internal Server Error",
            message: "500 Internal Server Error, User not logged in",
            success: false
        });
    }
};
