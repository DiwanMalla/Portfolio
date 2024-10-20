import { Schema, models, model } from "mongoose";
const ProductSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    tags: [{ type: String }],
    afilink: { type: String },
    price: { type: String },
    status: { type: String },
  },
  {
    timestamps: true, //this will automatically manage createdAt and updatedAt
  }
);
export const Shop = models.Shop || model("Shop", ProductSchema, "shops");
