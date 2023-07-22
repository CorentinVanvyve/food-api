import { IUser } from "../interfaces/user.interface";
import mongoose, { model } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Field is required"]
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "Field is required"]
  },
  is_active: {
    type: Boolean,
    default: true
  },
},
{
  timestamps: true
});

export const User = model<IUser>("User", UserSchema);
