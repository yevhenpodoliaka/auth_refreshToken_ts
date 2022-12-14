import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongoose";
dotenv.config()
const {SECRET_KEY_ACCESS="", SECRET_KEY_REFRESH="" } = process.env

const createTokens = (_id: ObjectId) => {
    const payload = {
        id: _id
    }
    const accessToken = jwt.sign(payload, SECRET_KEY_ACCESS, { expiresIn: "15m" })
    const refreshToken = jwt.sign(payload, SECRET_KEY_REFRESH, { expiresIn: "1w" })
    return { accessToken, refreshToken }
}
export default createTokens