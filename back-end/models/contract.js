import mongoose, {ObjectId} from "mongoose";

const contractSchema = new mongoose.Schema({
    renter:{
        type:String,
        required:true
    },
    renterID:{
        type:Number,
        required:true
    },
    price:{
        type: Number,
    },
    startdate:{
        type: String,
    },
    month: {
        type: String,
    },
    room:{
        type: String,
    },
    location:{
        type: String,
    },
    roomImage:{
        type:String,
    },
    contractImage:{
        type: String
    }

},{timestamps:true})

export default mongoose.model('Contract',contractSchema)