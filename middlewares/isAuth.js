import jwt from "jsonwebtoken"





const isAuth=async(req,res,next)=>{
    try{
        let {token} =req.cookies

        if(!token){
            return res.status(400).json({message:"user does not have a token"})
        }
        console.log("user id",req.cookies)//
        //verify token userid
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET)

        console.log("verified token",verifyToken)//
        //we get verfied token
         if(!verifyToken){
            return res.status(400).json({message:"user does not have a valid token"})
        }
        req.userId=verifyToken.userID
        console.log("req userid:",req.userId)//
        next()


    }catch(error){
        return res.status(500).json({message:` is google auth error ${error}`})

    }

}
export default isAuth