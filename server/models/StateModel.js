import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StateSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'city',
        }
    ],
});

export default mongoose.model('states', StateSchema);
