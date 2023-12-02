import mongoose, {ObjectId} from "mongoose";

const  paymentSchema = new mongoose.Schema({
    status:{
        type:String,
    },
    reason:{
        type:String,
    },
    price:{
        type: Number,
    },
    status:{
        type:String,
    },
    date:{
        type:String,
    },

},{timestamps:true})

export default mongoose.model('Paymen',paymentSchema)

