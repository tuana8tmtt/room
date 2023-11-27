import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userOrder: {
        name:{
            type:String,
            required: true
        },
        email:{
            type:String,
            required: true
        },
        phone:{
            type:Number,
            required: true
        },
        address:{
            type:String,
            required: true
        }
    },
    listOrder:[
        {
            key:{
                type: Number,
                required:true
            },
            id:{
                type: String,
                required:true
            },
            name:{
                type: String,
                required:true
            },
            price:{
                type: Number,
                required:true
            },
            image:{
                type: String,
                required:true
            },
            quantity:{
                type: Number,
                required:true
            },
            itemTotal:{
                type: Number,
                required:true
            } 
        }
    ],
    cartTotal:{
        type:Number,
        required: true
    },
    status:{
        type:Number,
        required: true
    }
        
},{timestamps:true})
export default mongoose.model('Order',orderSchema)