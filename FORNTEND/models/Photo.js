import { Schema, models, model } from "mongoose";

const PhotoSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    images: [{ type: String, required: true }], // List of image URLs
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

export const Photo = models.Photo || model("Photo", PhotoSchema, "photos");
