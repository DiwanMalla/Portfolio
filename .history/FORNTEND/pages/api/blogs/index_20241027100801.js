import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
  //if authenticated, connect to mongodb
  await mongooseConnect();
  const { method } = req;
  if (method === "GET") {
    if (req.query?.id) {
      //fetch a single blog by id
      const blog = await Blog.findById(req.query.id);
      res.json(blog);
    } else if (req.query?.projectCategory) {
      //fetch blog by Blogcategory
      const projectCategory = await Blog.find({
        projectCategory: req.query.projectCategory,
      });
      res.json(projectCategory);
    } else if (req.query?.sluh) {
      //fetch project by slug
      const projectSlug = await Project.find({
        projectSlug: req.query.projectSlug,
      });
      res.json(projectSlug);
    } else {
      //fetch all projects
      const projects = await Project.find();
      res.json(projects.reverse());
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
