import { IProfile } from "../interfaces/profile.interface";
import mongoose, { Schema, model } from "mongoose";

const ProfileSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Field is required"]
  },
  last_name: {
    type: String,
    required: [true, "Field is required"]

  },
  user_id: {
		type: Schema.Types.ObjectId,
    ref: "User", // This specifies the reference to the User model
		unique: true,
    required: true,
  },
},
{
  timestamps: true
});

export const Profile = model<IProfile>("Profile", ProfileSchema);
