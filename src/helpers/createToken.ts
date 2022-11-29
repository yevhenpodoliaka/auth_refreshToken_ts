import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongoose";
dotenv.config()
const { SECRET_KEY="" } = process.env

const createToken = (_id: ObjectId) => {
    const payload = {
        id: _id
    }
    const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "15m" })
    const refreshToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "1w" })
    return { accessToken, refreshToken }
}
export default createToken