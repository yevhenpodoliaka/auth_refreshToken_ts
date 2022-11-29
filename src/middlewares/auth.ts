import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { User, IUser } from "../models/User";
import { RequestError } from "../helpers";
import { ObjectId } from "mongoose";

dotenv.config();

const { SECRET_KEY = "" } = process.env;

export interface IPayload extends JwtPayload {
  id?: ObjectId;
}

export interface IRequest extends Request {
    user?: IUser | null
} 
const auth = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    const error = RequestError(401, "Token invalid");
    next(error);
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY) as IPayload;
    const user: IUser | null = await User.findById(id);
    if (!user) {
      next(RequestError(401, "User not found"));
    }
    if (!user?.accessToken) {
      next(RequestError(401, "Token expired"));
    }
    req.user = user;
    next();
  } catch (error: any) {
    const { message = "Unauthorized" } = error;
    const responseError = RequestError(401, message);
    next(responseError);
  }
};

export default auth;
