import { Request, Response } from "express";
import { User, IUser } from "../../models/User";
import { RequestError } from "../../helpers";
import { ObjectId } from "mongoose";
import bcrypt from "bcryptjs"

const signUp = async (req: Request, res: Response):Promise<void> => {
    const { name, email, password } = req.body
    const user:IUser&{_id:ObjectId}|null = await User.findOne({ email })
    if (user) {
       throw RequestError(409,`User with ${email} already exist`)
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password:hashedPassword })
    res.status(201).json({
        user: {
            name,
            email
        }
    })
}

export default signUp