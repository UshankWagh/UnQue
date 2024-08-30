import mongoose from 'mongoose'
const Schema = mongoose.Schema;

/*

fname
lname
shop

*/

const EmployeeSchema = new Schema({
    avatar: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
    shopownerId: {
        type: Schema.Types.ObjectId,
        ref: 'shopowners',
        required: true
    }
});

export default mongoose.model('employee', EmployeeSchema);