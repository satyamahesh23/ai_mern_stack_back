// frotend data
// create user
// token create
// store in cookie

import genToken from "../config/token.js"
import User from "../models/user.model.js"

export const googleAuth=async(req,res)=>{
    //bring some frontend data
    try{
        const {name,email}=req.body
        let user=await User.findOne({email})
        if(!user){
            user=await User.create({
                name,
                email
            })
        }
        //token store in cookie
        let token =await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(user)

    }catch(error){
        return res.status(500).json({
            message:`Google auth error ${error}`
        })

    }

}
export const logOut=async(req,res)=>{
    try{
        await res.clearCookie("token")
        return res.status(200).json({message:"logout successfully"})

    }catch(error){
         return res.status(500).json({message:`logout error ${error}`})

    }

}