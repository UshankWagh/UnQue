const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
