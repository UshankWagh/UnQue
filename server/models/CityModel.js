import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    areas: [
        {
            type: String,
        }
    ],
});

export default mongoose.model('city', CitySchema);
