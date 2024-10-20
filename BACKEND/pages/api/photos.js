import { mongooseConnect } from "@/lib/mongoose";
import { Photo } from "@/models/Photo";
export default async function handle(req, res) {
  // Connect to MongoDB
  await mongooseConnect();
  const { method } = req;

  if (method === "POST") {
    const { title, slug, images } = req.body;
    try {
      const photoDoc = await Photo.create({
        title,
        slug,
        images, // Array of image URLs
      });
      res.status(201).json(photoDoc);
    } catch (error) {
      res.status(400).json({ error: "Error creating photo" });
    }
  }

  if (method === "GET") {
    try {
      if (req.query?.id) {
        // Fetch a specific photo by ID
        const photo = await Photo.findById(req.query.id);
        if (!photo) return res.status(404).json({ error: "Photo not found" });
        return res.status(200).json(photo);
      } else {
        // Fetch all photos and reverse them
        const photos = await Photo.find();
        return res.status(200).json(photos.reverse());
      }
    } catch (error) {
      return res.status(500).json({ error: "Error fetching photos" });
    }
  }

  if (method === "PUT") {
    const { _id, title, slug, images } = req.body;
    try {
      await Photo.updateOne({ _id }, { title, slug, images });
      res.json(true);
    } catch (error) {
      res.status(400).json({ error: "Error updating photo" });
    }
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      try {
        await Photo.deleteOne({ _id: req.query.id });
        res.json(true);
      } catch (error) {
        res.status(400).json({ error: "Error deleting photo" });
      }
    }
  }
}
