import { mongooseConnect } from "@/lib/mongoose";
import { Photo } from "@/models/Photo";

export default async function handle(req, res) {
  // Connect to MongoDB
  await mongooseConnect();
  const { method } = req;

  if (method === "GET") {
    if (req.query?.id) {
      // Fetch a single photo by ID
      const photo = await Photo.findById(req.query.id);
      console.log("Fetched photo:", photo);
      res.json(photo);
    } else {
      // Fetch all photos
      const photos = await Photo.find();
      res.json(photos.reverse());
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
