import {  Response } from "express"
import {User} from "../../models/User"
import { IRequest } from "../../middlewares/auth"

const signOut = async (req:IRequest, res:Response): Promise<void>  => {
    await User.findOneAndUpdate(req.user?._id,{accessToken:"",refreshToken:""})
    res.status(204)
} 
export default signOut