import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const QueueSchema = new Schema({
    shopownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shopowner',
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
    minWaitTime: {
        type: Number,
        required: true
    },
    firstTicket: {
        type: Number,
        default: 0,
    },
    lastTicket: {
        type: Number,
        default: 0,
    },
    cancelledTickets: [
        {
            type: Number,
        }
    ],
});

export default mongoose.model('queue', QueueSchema);
