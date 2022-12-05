import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User, IUser } from "../../models/User";
import { RequestError, createTokens } from "../../helpers";
import { ObjectId } from "mongoose";

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: (IUser & { _id: ObjectId }) | null = await User.findOne({
    email,
  });
  if (!user) {
    throw RequestError(404, `User with email ${email} is not defined`);
  }
   const passwordCompare = await bcrypt.compare(password, user.password)
  if (!passwordCompare) {
    throw RequestError(401, "Password wrong");
  }

  const {accessToken,refreshToken} = createTokens(user._id);
  await User.findOneAndUpdate(user._id, { accessToken,refreshToken });

  res.json({
    email: user.email,
    accessToken,
    refreshToken,
  });
};

export default signIn;
