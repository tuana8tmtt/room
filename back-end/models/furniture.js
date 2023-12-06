 import mongoose, {ObjectId} from "mongoose";

const furnitureSchema = new mongoose.Schema({
    status:{
        type:String,
    },
    numberRoom:{
        type:Number,
    },
    quantity:{
        type: Number,
    },
    address:{
        type: String,
    },
    service_id:{
        type: String,
    },
    buy_date:{
        type: String,
    },
    guarantee:{
        type: String,
    },

},{timestamps:true})

export default mongoose.model('Furniture',furnitureSchema)