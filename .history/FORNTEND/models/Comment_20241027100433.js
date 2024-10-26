import { Schema, models, model } from "mongoose";
const CommentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    title: { type: String },
    contentpera: { type: String },
    mainComment: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
    blog: { type: Schema.Types.ObjectId, ref: "Blog" },
  },
  {
    timestamps: true, //this will automatically manage createdAt and updatedAt
  }
);
export const Comment =
  models.Comment || model("Comment", CommentSchema, "comments");
