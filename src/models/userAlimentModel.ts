import { IUserAliment } from "../interfaces/userAlimentInterface";
import mongoose, { Schema, model } from "mongoose";

const UserAlimentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Field is required"]
  },
  kcal: {
    type: Number,
    required: false,
    default: 0,

  },
  protein: {
    type: Number,
    required: false,
    default: 0,

  },
  lipid: {
    type: Number,
    required: false,
    default: 0,
  },
  carbohydrate: {
    type: Number,
    required: false,
    default: 0,

  },
  sugar: {
    type: Number,
    required: false,
    default: 0,

  },
  store_product_link: {
    type: String,
    required: false,

  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
},
{
  timestamps: true
});

export const UserAliment = model<IUserAliment>("UserAliment", UserAlimentSchema);
