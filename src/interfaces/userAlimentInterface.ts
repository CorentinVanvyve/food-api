import { Document } from "mongoose";
import { IUser } from "./userInterface";

export interface IUserAliment extends Document {
  name: String;
  kcal: Number;
  protein: Number;
  lipid: Number;
  sugar: Number;
  carbohydrate: Number;
  store_product_link: String;
  user: IUser['_id'];
}