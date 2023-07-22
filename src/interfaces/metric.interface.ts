import { Document } from "mongoose";
import { IUser } from "./user.interface";

export interface IMetric extends Document {
  birth_date: Date;
  weight: Number;
  height: Number;
  maintenance: Number;
  gender: String;
  user_id: IUser["_id"];
}