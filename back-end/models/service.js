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
    image:{
        type: String
    }

},{timestamps:true})

export default mongoose.model('Service',serviceSchema)