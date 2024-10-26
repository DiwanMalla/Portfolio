import { Schema, models, model } from "mongoose";
const BlogSchema = new Schema(
  {},
  {
    timestamps: true, //this will automatically manage createdAt and updatedAt
  }
);
export const Blog = models.Blog || model("Blog", BlogSchema, "blogs");
