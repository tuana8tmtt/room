import mongoose, { ObjectId } from "mongoose";

const notificationSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    furniture_id: {
        type: Number,
    },
    payment_id: {
        type: Number,
    },
    contract_id: {
        type: Number,
    },
    date: {
        type: String,
    }

}, { timestamps: true })

export default mongoose.model('Notification', notificationSchema)

