import { Schema, models, model } from "mongoose";
const CommentSchema = new Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true, //this will automatically manage createdAt and updatedAt
  }
);
export const Comment =
  models.Comment || model("Comment", CommentSchema, "comments");
