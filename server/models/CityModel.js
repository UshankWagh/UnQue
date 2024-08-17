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

module.exports = mongoose.model('City', CitySchema);