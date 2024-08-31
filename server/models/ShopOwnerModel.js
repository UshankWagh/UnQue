import mongoose from 'mongoose'
import Queue from "./QueueModel.js";
const Schema = mongoose.Schema;

/*
state
area
city

fname
lname
email
*/

const ShopOwnerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: true
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
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        area: {
            type: String,
            required: true
        },
        counters: [
            {
                counterNo: {
                    type: Number,
                    required: true
                },
                queue: {
                    type: Schema.Types.ObjectId,
                    ref: 'queue'
                }
            }
        ],
        employees: [
            {
                type: Schema.Types.ObjectId,
                ref: 'employee'
            }
        ]
    }
});

export default mongoose.model('shopowner', ShopOwnerSchema);






// const ShopOwnerSchema = new Schema({
//     ownerName: {
//         type: String,
//         required: true
//     },
//     avatar: {
//         type: String
//     },
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     shop: {
//         shopImg: {
//             type: String
//         },
//         shopName: {
//             type: String,
//             required: true
//         },
//         address: {
//             type: String,
//             required: true
//         },
//         counters: [
//             {
//                 countNo: {
//                     type: Number,
//                     required: true
//                 },
//                 queId: {
//                     type: Schema.Types.ObjectId,
//                     ref: 'queues'
//                 }
//             }
//         ],
//         employees: [
//             {
//                 type: Schema.Types.ObjectId,
//                 ref: 'Employee'
//             }
//         ]
//     }
// });

// export default mongoose.model('shopowner', ShopOwnerSchema);

