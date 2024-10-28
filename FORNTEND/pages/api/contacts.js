import { mongooseConnect } from "@/lib/mongoose";
import { Contact } from "@/models/contact";

export default async function handle(req, res) {
  await mongooseConnect();

  if (req.method === "POST") {
    const {
      fname,
      lname,
      email,
      company,
      phone,
      country,
      price,
      description,
      project,
    } = req.body;

    try {
      // Create a new contact document in the database
      const newContact = await Contact.create({
        fname,
        lname,
        email,
        company,
        phone,
        country,
        price,
        description,
        project,
      });

      // Send a success response
      res.status(201).json({
        success: true,
        message: "Contact created successfully",
        contact: newContact,
      });
    } catch (error) {
      console.error("Error creating contact:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to create contact" });
    }
  } else {
    // Handle unsupported request methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
