import { Schema, models, model } from "mongoose";

const ProfileSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

export const Profile =
  models.Profile || model("Profile", ProfileSchema, "admin");
