import { Document } from "mongoose";

export interface IUser extends Document {
  phone: string;
  is_active: Boolean;
  createdAt: Date;
  updatedAt: Date;
}