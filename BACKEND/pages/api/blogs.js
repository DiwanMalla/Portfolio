import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
  //if authenticated, connect to MongoDb
  await mongooseConnect();
  const { method } = req;
  if (method === "POST") {
    const { title, slug, images, description, blogCategory, tags, status } =
      req.body;
    const blogDoc = await Blog.create({
      title,
      slug,
      images,
      description,
      blogCategory,
      tags,
      status,
    });
    res.json(blogDoc);
  }
  if (method === "GET") {
    try {
      if (req.query?.id) {
        // Fetch a specific blog by ID
        const blog = await Blog.findById(req.query.id);
        if (!blog) return res.status(404).json({ error: "Blog not found" });
        return res.status(200).json(blog);
      } else {
        // Fetch all blogs and reverse them
        const blogs = await Blog.find();
        return res.status(200).json(blogs.reverse());
      }
    } catch (error) {
      return res.status(500).json({ error: "Error fetching blogs" });
    }
  }
  if (method === "PUT") {
    const {
      _id,
      title,
      slug,
      images,
      description,
      blogCategory,
      tags,
      status,
    } = req.body;
    await Blog.updateOne(
      { _id },
      { title, slug, images, description, blogCategory, tags, status }
    );
    res.json(true);
  }
  if (method === "DELETE") {
    if (req.query?.id) {
      await Blog.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
