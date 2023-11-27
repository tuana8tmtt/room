import expressJWT from 'express-jwt'

export const checkAuth = (request,response,next)=>{
    const isAdmin = true;
    if(isAdmin){
        console.log("Chào Admin")
        next()
    }else{
        console.log("Bạn không có quyền truy cập")
    }
}

export const requiredSignin = expressJWT({
    secret:"123456",
    algorithms:["HS256"],
    requestProperty:"auth"
})

export const isAuth = (request,response,next)=>{
    console.log(request.auth);
    console.log(request.profile);
    const user = request.profile._id == request.auth._id;
    if(!user){
        return response.status(400).json({
            message:"Bạn không có quyền truy cập"
        })
    }
    next()
}

export const isAdmin = (request,response,next)=>{
    
    next()
}