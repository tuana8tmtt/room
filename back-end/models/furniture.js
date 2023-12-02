 import mongoose, {ObjectId} from "mongoose";

const furnitureSchema = new mongoose.Schema({
    status:{
        type:String,
    },
    name:{
        type:String,
    },
    image:{
        type: String,
    },
    price:{
        type: Number,
    },
    image:{
        type: String,
    },
    status:{
        type: String,
    },
    quantity:{
        type: Number,
    },
    description:{
        type: String,
    },
    room_id:{
        type: Number,
    },
    buy_date:{
        type: String,
    },
    guarantee_period:{
        type: String,
    },

},{timestamps:true})

export default mongoose.model('Furniture',furnitureSchema)