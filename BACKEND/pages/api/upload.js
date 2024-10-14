import { mongooseConnect } from "@/lib/mongoose";

import multiparty from "multiparty";
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handle(req, res) {
  //connect database
  await mongooseConnect();
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  const links = [];
  for (const file of files.file) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "diwan-admin",
      public_id: `file_${Date.now()}`,
      resource_type: `auto`,
    });
    const link = result.secure_url;
    links.push(link);
  }
  return res.json({ links });
}
export const config = {
  api: { bodyParser: false },
};
