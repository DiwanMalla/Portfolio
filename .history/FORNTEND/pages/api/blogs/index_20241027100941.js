import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
  // If authenticated, connect to MongoDB
  await mongooseConnect();
  const { method } = req;

  if (method === "GET") {
    if (req.query?.id) {
      // Fetch a single blog by id
      const blog = await Blog.findById(req.query.id);
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).json({ message: "Blog not found" });
      }
    } else if (req.query?.blogCategory) {
      // Fetch blogs by blog category
      const blogsByCategory = await Blog.find({
        blogCategory: req.query.blogCategory,
      });
      res.json(blogsByCategory);
    } else if (req.query?.slug) {
      // Fetch blog by slug
      const blogBySlug = await Blog.findOne({
        slug: req.query.slug,
      });
      if (blogBySlug) {
        res.json(blogBySlug);
      } else {
        res.status(404).json({ message: "Blog not found" });
      }
    } else {
      // Fetch all blogs
      const blogs = await Blog.find();
      res.json(blogs.reverse());
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
