import mongoose from 'mongoose'
const Schema = mongoose.Schema;

/*

fname
lname
state
city
area
shop

*/

const EmployeeSchema = new Schema({
    avatar: {
        type: String
    },
    name: {
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
    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'ShopOwner',
        required: true
    }
});

export default mongoose.model('employee', EmployeeSchema);