import { Document } from "mongoose";
import { IUser } from "./userInterface";

export interface IProfile extends Document {
  first_name: string;
  last_name: Boolean;
  createdAt: Date;
  updatedAt: Date;
  user: IUser["_id"];
}