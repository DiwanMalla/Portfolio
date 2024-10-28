import { mongooseConnect } from "@/lib/mongoose";
// import { Comment } from "@/models/Comment"; // Make sure this is the correct path to your Comment model

export default async function handle(req, res) {
  await mongooseConnect();
  const { method } = req;

  if (method === "POST") {
    try {
      const {
        name,
        email,
        title,
        contentpera,
        mainComment = true, // Assuming it's true if not provided
        blog,
        parent,
        parentName,
      } = req.body;

      let commentDoc;

      // Create a new comment with all required fields
      commentDoc = await Comment.create({
        name,
        email,
        title,
        contentpera,
        mainComment,
        blog,
        parent: parent || null, // Add parent only if provided
        parentName: parent ? parentName : null,
      });

      // If there's a parent, update its `children` field with this new comment's ID
      if (parent) {
        try {
          await Comment.findByIdAndUpdate(parent, {
            $push: { children: commentDoc._id },
          });
        } catch (updateErr) {
          console.error(
            "Error updating parent comment with child ID:",
            updateErr.message,
            updateErr.stack
          );
        }
      }

      // Respond with 201 Created and return the new comment document
      res.status(201).json(commentDoc);
    } catch (err) {
      console.error("Error creating comment:", err.message, err.stack);
      res
        .status(500)
        .json({ err: "Failed to create comment", details: err.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
