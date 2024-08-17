const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShopOwnerSchema = new Schema({
    ownerName: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    shop: {
        shopImg: {
            type: String
        },
        shopName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        counters: [
            {
                countNo: {
                    type: Number,
                    required: true
                },
                queId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Queue'
                }
            }
        ],
        employees: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Employee'
            }
        ]
    }
});

const ShopOwner = mongoose.model('ShopOwner', ShopOwnerSchema);

module.exports = ShopOwner;
