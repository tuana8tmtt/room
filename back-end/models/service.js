import mongoose, {ObjectId} from "mongoose";

const serviceSchema = new mongoose.Schema({
    status:{
        type:String,
    },
    name:{
        type:String,
    },
    price:{
        type: Number,
    },

},{timestamps:true})

export default mongoose.model('Service',serviceSchema)