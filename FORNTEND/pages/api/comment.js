import { mongooseConnect } from "@/lib/mongoose";
import Comment from "@/models/Comment"; // Use default import

export default async function handle(req, res) {
  await mongooseConnect();
  const { method } = req;
  if (method === "POST") {
    try {
      const { name, email, title, contentpera, parent } = req.body;
      let commentDoc;
      if (parent) {
        commentDoc = await Comment.create({
          name,
          email,
          title,
          contentpera,
          parent,
        });

        await Comment.findByIdAndUpdate(parent, {
          $push: { children: commentDoc._id },
        });
      } else {
        commentDoc = await Comment.create({
          name,
          email,
          title,
          contentpera,
        });
      }
      res.status(201).json(commentDoc); // Respond with 201 Created status
    } catch (err) {
      console.log(`Error creating comment:`, err);
      res.status(500).json({ err: "Failed to create comment" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
