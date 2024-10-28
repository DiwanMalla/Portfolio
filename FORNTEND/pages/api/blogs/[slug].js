import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import { Comment } from "@/models/Comment";

export default async function handler(req, res) {
  const { slug } = req.query;
  await mongooseConnect();

  if (req.method === "GET") {
    try {
      // Fetch blog by slug
      const blog = await Blog.findOne({ slug });
      if (!blog) {
        return res.status(404).json({ message: "Blog Not Found" });
      }

      // Fetch comments for this blog
      const comments = await Comment.find({ blog: blog._id }).sort({
        createdAt: -1,
      });
      return res.status(200).json({ blog, comments });
    } catch (err) {
      console.error("Error fetching blog data:", err);
      return res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "POST") {
    try {
      // Extract comment data from the request body
      const { name, email, title, contentpera, mainComment, parent } = req.body;

      // Find the blog by slug to associate it with the new comment
      const blog = await Blog.findOne({ slug });
      if (!blog) {
        return res.status(404).json({ message: "Blog Not Found" });
      }
      if (parent) {
        //if it's a child comment, find the parent comment
        const parentComment = await Comment.findById(parent);
        if (!parentComment) {
          return res.status(404).json({ message: "Parent comment not found" });
        }
        // Create new child comment
        const newComment = await Comment.create({
          name,
          email,
          title,
          contentpera,
          mainComment,
          blog: blog._id,
          parent: parentComment._id,
          parentName: parentComment.name, //optionally, store parent name for display purposes
        });

        //save the child comment
        await newComment.save();

        //update parent comment to include the child comment
        parentComment.children.push(newComment._id);
        await parentComment.save();
        res.status(201).json(newComment);
      } else {
        //if it's a root comment (no parent), create it directly
        const newComment = new Comment({
          name,
          email,
          title,
          contentpera,
          mainComment,
          blog: blog._id,
        });
        await newComment.save();
        return res
          .status(201)
          .json({ message: "Comment added successfully", newComment });
      }
    } catch (err) {
      console.error("Error creating comment:", err);
      return res.status(500).json({ message: "Failed to add comment" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
}
