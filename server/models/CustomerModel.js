import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    email: {
        notifyMe: {
            type: Boolean,
            default: false,
        },
        emailId: {
            type: String,
            required: true,
            unique: true,
        },
    },
    phone: {
        notifyMe: {
            type: Boolean,
            default: false,
        },
        phoneNo: {
            type: Number,
            required: true,
            unique: true,
        },
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    queues: [
        {
            ticket: {
                type: String,
                required: true,
            },
            queId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Queue',
                required: true,
            },
        },
    ],
});

module.exports = mongoose.model('Customer', CustomerSchema);
