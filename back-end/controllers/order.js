import Category from '../models/category'
import Product from '../models/products'
import Order from '../models/order'

export const addOrder = async (request,response)=>{
    try {
        const order = await Order(request.body).save()
        response.json(order)
    } catch (error) {
        response.status(400).json({message:"Khong the tao moi"})
    }
}
export const listOrder = async(request,response)=>{
    try {
        const order = await Order.find().exec()
        response.json(order)
    } catch (error) {
        response.status(400).json({message:"Khong the hien thi"})
    }
}
export const listOrderDetail = async (request,response)=>{
    try {
        const order = await Order.findOne({_id:request.params.id}).exec()
        // const product = await Product.find({category}).populate("category").exec()
        // const product = await Product.find({category}).select("-category").exec()
        response.json(order)
    } catch (error) {
        response.status(400).json({message:"Khong the hien thi"})
    }
}
export const deleteOrder = async (request,response)=>{
    try {
        const order = await Order.findOneAndDelete({_id:request.params.id}).exec()
        response.json(order);
    } catch (error) {
        response.status(400).json({message:"Khong xoa duoc"})
    }
}
export const updateOrder = async (request,response)=>{
    try {
        const order = await Order.findOneAndUpdate({_id:request.params.id},request.body,{new:true}).exec()
        response.json(order);
    } catch (error) {
        response.status(400).json({message:"Khong tim thay du lieu de sua"})
    }
}