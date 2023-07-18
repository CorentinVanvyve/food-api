import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  phone: string;
  is_active: Boolean;
  createdAt: Date;
  updatedAt: Date;
}