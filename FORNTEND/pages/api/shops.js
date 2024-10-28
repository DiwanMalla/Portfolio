import { mongooseConnect } from "@/lib/mongoose";
import { Shop } from "@/models/Shop";

export default async function handle(req, res) {
  // Connect to MongoDB
  await mongooseConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      if (req.query?.id) {
        // Fetch a single shop item by id
        const shopItem = await Shop.findById(req.query.id);
        res.json(shopItem);
      } else if (req.query?.slug) {
        // Fetch shop item by slug
        const shopItem = await Shop.findOne({ slug: req.query.slug });
        res.json(shopItem);
      } else {
        // Fetch all shop items
        const shopItems = await Shop.find();
        res.json(shopItems.reverse());
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
