import { Document } from "mongoose";
import { IUser } from "./userInterface";

export interface IMetric extends Document {
  birth_date: Date;
  weight: Number;
  height: Number;
  maintenance: Number;
  gender: String;
  user: IUser["_id"];
}