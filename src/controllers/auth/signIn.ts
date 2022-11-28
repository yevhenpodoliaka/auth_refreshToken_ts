import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User, IUser } from "../../models/User";
import { RequestError, createToken } from "../../helpers";
import { ObjectId } from "mongoose";

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: (IUser & { _id: ObjectId }) | null = await User.findOne({
    email,
  });
  if (!user) {
    throw RequestError(404, `User with email ${email} is not defined`);
  }
  if (!bcrypt.compare(password, user.password)) {
    throw RequestError(401, "Password wrong");
  }

  const token = createToken(user._id);
  await User.findOneAndUpdate(user._id, { token });

  res.json({
    email: user.email,
    token,
  });
};

export default signIn;
