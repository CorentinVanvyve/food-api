import { Document } from "mongoose";
import { IUser } from "./user.interface";

export interface IProfile extends Document {
  first_name: string;
  last_name: Boolean;
  createdAt: Date;
  updatedAt: Date;
  user_id: IUser["_id"];
}