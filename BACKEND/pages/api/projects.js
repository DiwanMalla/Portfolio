import { mongooseConnect } from "@/lib/mongoose";
import { Project } from "@/models/Project";

export default async function handle(req, res) {
  await mongooseConnect(); // Connect to MongoDB

  const { method } = req; // Get the request method

  if (method === "POST") {
    // Create a new project
    const {
      title,
      slug,
      images,
      description,
      client,
      projectCategory,
      tags,
      status,
      livePreview,
    } = req.body;
    try {
      const projectDoc = await Project.create({
        title,
        slug,
        images,
        description,
        client,
        projectCategory,
        tags,
        status,
        livePreview,
      });
      res.status(201).json(projectDoc); // Return the created project
    } catch (error) {
      res.status(500).json({ error: "Error creating project" });
    }
  }

  if (method === "GET") {
    // Fetch project(s)
    try {
      if (req.query?.id) {
        // Fetch a specific project by ID
        const project = await Project.findById(req.query.id);
        if (!project)
          return res.status(404).json({ error: "Project not found" });
        return res.status(200).json(project);
      } else {
        // Fetch all projects and reverse them
        const projects = await Project.find();
        return res.status(200).json(projects.reverse());
      }
    } catch (error) {
      return res.status(500).json({ error: "Error fetching projects" });
    }
  }

  if (method === "PUT") {
    // Update an existing project
    const {
      _id,
      title,
      slug,
      images,
      description,
      client,
      projectCategory,
      tags,
      status,
      livePreview,
    } = req.body;
    try {
      await Project.updateOne(
        { _id },
        {
          title,
          slug,
          images,
          description,
          client,
          projectCategory,
          tags,
          status,
          livePreview,
        }
      );
      res.status(200).json(true);
    } catch (error) {
      res.status(500).json({ error: "Error updating project" });
    }
  }

  if (method === "DELETE") {
    // Delete a project
    if (req.query?.id) {
      try {
        await Project.deleteOne({ _id: req.query.id });
        res.status(200).json(true);
      } catch (error) {
        res.status(500).json({ error: "Error deleting project" });
      }
    }
  }
}
