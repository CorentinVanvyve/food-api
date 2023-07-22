import { IUser } from "../interfaces/userInterface";
import mongoose, { model } from "mongoose";

const UserSchema = new mongoose.Schema({
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
