import mongoose, {ObjectId} from "mongoose";

const billSchema = new mongoose.Schema({
    status:{
        type:String,
    },
    contract_id:{
        type:Number,
    },
    service_id:{
        type: Number,
    },
    date:{
        type: String,
    },

},{timestamps:true})

export default mongoose.model('Bill',billSchema)