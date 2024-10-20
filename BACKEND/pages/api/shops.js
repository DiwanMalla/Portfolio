import { mongooseConnect } from "@/lib/mongoose";
import { Shop } from "@/models/Shop"; // Updated to import Shop model

export default async function handle(req, res) {
  // Connect to MongoDB
  await mongooseConnect();
  const { method } = req;

  if (method === "POST") {
    const { title, slug, images, description, tags, afilink, price, status } =
      req.body;
    try {
      const shopDoc = await Shop.create({
        title,
        slug,
        images,
        description,
        tags,
        afilink, // Affiliate link
        price,
        status,
      });
      res.status(201).json(shopDoc);
    } catch (error) {
      res.status(400).json({ error: "Error creating shop" });
    }
  }

  if (method === "GET") {
    try {
      if (req.query?.id) {
        // Fetch a specific shop product by ID
        const shop = await Shop.findById(req.query.id);
        if (!shop)
          return res.status(404).json({ error: "Shop item not found" });
        return res.status(200).json(shop);
      } else {
        // Fetch all shop products and reverse them
        const shops = await Shop.find();
        return res.status(200).json(shops.reverse());
      }
    } catch (error) {
      return res.status(500).json({ error: "Error fetching shop items" });
    }
  }

  if (method === "PUT") {
    const {
      _id,
      title,
      slug,
      images,
      description,
      tags,
      afilink,
      price,
      status,
    } = req.body;
    try {
      await Shop.updateOne(
        { _id },
        { title, slug, images, description, tags, afilink, price, status }
      );
      res.json(true);
    } catch (error) {
      res.status(400).json({ error: "Error updating shop item" });
    }
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      try {
        await Shop.deleteOne({ _id: req.query.id });
        res.json(true);
      } catch (error) {
        res.status(400).json({ error: "Error deleting shop item" });
      }
    }
  }
}
