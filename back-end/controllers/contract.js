import Category from '../models/category'
import Contract from '../models/contract'


export const listContract = async (request,response)=>{
    try{
        const contract = await Contract.find().exec()

        response.json(contract)
    }catch(error){
        response.status(400).json({message:"Khong tim thay data"})
    }
}
export const listContractDetail = async (request,response)=>{
    try{
        const contract = await Contract.findOne({_id:request.params.id}).exec()

        response.json(contract)
    }catch(error){
        response.status(400).json({message:"Khong tim thay data"})
    }
    // const product = products.find(item => item.id === +request.params.id)
    // response.json(product)
}
export const createContract = async (request,response)=>{
    try{
        const contract = await Contract(request.body).save()
        response.json(contract)
        // response.json(products)
    }catch(error){
        response.status(400).json({message:"Khong the tao moi"})
    }
    // products.push(request.body)
    // response.json(products)
}
export const deleteContract = async (request,response)=>{
    try {
        const contract = await Contract.findOneAndDelete({_id:request.params.id}).exec()
        response.json(contract);
    } catch (error) {
        response.status(400).json({message:"Khong xoa duoc"})
    }
    // const product = products.filter(item => item.id != request.params.id)
    // response.json(product);
}
export const updateContract = async (request,response)=>{
    try {
        const contract = await Contract.findOneAndUpdate({_id:request.params.id},request.body,{new:true}).exec()
        response.json(contract)
    } catch (error) {
        response.status(400).json({message:"Loi khong update duoc"})
    }
    // response.json(products.map(item => item.id === +request.params.id? request.body:item))
}