import mongoose, {ObjectId} from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },  
    address:{
        type: String,
    },
    floor:{
        type: String,
    },
    numberRoom:{
        type: String,
    },
    connectHost:{
        type: String,
    },
    phoneHost:{
        type: String,
    },
    emailHost:{
        type: String,
    },
    desc:{
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        
    }
},{timestamps:true})

export default mongoose.model('Product',productSchema)