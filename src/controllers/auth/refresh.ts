import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { RequestError,createTokens } from "../../helpers";
import { User } from "../../models/User"
import {IPayload} from "../../middlewares/auth"
dotenv.config();

const {SECRET_KEY_REFRESH = ""} = process.env;
const refresh = async (req: Request, res: Response, next: NextFunction) => { 
        try {
        const {refreshToken} = req.body;
        const {id} = jwt.verify(refreshToken, SECRET_KEY_REFRESH) as IPayload;
        const user = await User.findById(id);
        if(!user||user.refreshToken !== refreshToken) {
            throw RequestError(401, "Token expired")
            }
            const {accessToken:newAccessToken,refreshToken:newRefreshToken} = createTokens(id!);
    
        await User.findByIdAndUpdate(id, {accessToken: newAccessToken, refreshToken: newRefreshToken});
        res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        })
    }
    catch(error: any) {
        const {message = "Unauthorized"} = error;
        const responseError = RequestError(401, message);
        next(responseError);
    }
}
export default refresh