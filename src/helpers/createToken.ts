import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongoose";
dotenv.config()
const { SECRET_KEY="" } = process.env

const createToken = (_id:ObjectId) => {
    const payload = {
        id:_id
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10m" })
    return token
}

export default createToken