import  Joi  from "joi";
import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  token: string;
}
const userSchema = new Schema<IUser>({
  name: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 3,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },

  },
  { versionKey: false, timestamps: true }
)

export const joiSignUpSchema = Joi.object({
  name: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});
export const joiSignInSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});
export const User = model<IUser>("user", userSchema);
