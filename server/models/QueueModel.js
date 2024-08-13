import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const QueueSchema = new Schema({
    shopownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shopowner',
        required: true,
    },
    shopName: {
        type: String,
        required: true,
    },
    counterNo: {
        type: Number,
        required: true,
    },
    isOpen: {
        type: Boolean,
        default: true,
    },
    queueCount: {
        type: Number,
        default: 0,
    },
    firstTicket: {
        type: String,
        default: 0,
    },
    lastTicket: {
        type: String,
        default: 0,
    },
    cancelledTickets: [
        {
            type: String,
        }
    ],
});

module.exports = mongoose.model('Queue', QueueSchema);
