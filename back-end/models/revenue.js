import mongoose, { ObjectId } from "mongoose";

const revenueSchema = new mongoose.Schema({
    costname: {
        type: String,
    },
    cost: {
        type: Number,
    },
    paymentdeadline: {
        type: String,
    },
    paymentdate: {
        type: String,
    },
    key: {
        type: Number
    },
    roomId:{
        type: String
    }

}, { timestamps: true })

export default mongoose.model('Revenue', revenueSchema)

