import { Schema, models, model } from "mongoose";

const ContactSchema = new Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    phone: { type: String, required: true },
    country: { type: String },
    price: { type: String },
    description: { type: String },
    project: [{ type: String, required: true }], // List of image URLs
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

export const Contact =
  models.Contact || model("Contact", ContactSchema, "contacts");
