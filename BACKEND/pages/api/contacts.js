import { mongooseConnect } from "@/lib/mongoose";
import { Contact } from "@/models/contact";

export default async function handle(req, res) {
  // Connect to MongoDB
  await mongooseConnect();
  const { method } = req;

  if (method === "POST") {
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
      const contactDoc = await Contact.create({
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
      res.status(201).json(contactDoc);
    } catch (error) {
      res.status(500).json({ error: "Error creating contact" });
    }
  }

  if (method === "GET") {
    try {
      if (req.query?.id) {
        // Fetch a specific contact by ID
        const contact = await Contact.findById(req.query.id);
        if (!contact)
          return res.status(404).json({ error: "Contact not found" });
        return res.status(200).json(contact);
      } else {
        // Fetch all contacts and reverse them
        const contacts = await Contact.find();
        return res.status(200).json(contacts.reverse());
      }
    } catch (error) {
      return res.status(500).json({ error: "Error fetching contacts" });
    }
  }

  if (method === "PUT") {
    const {
      _id,
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
      await Contact.updateOne(
        { _id },
        {
          fname,
          lname,
          email,
          company,
          phone,
          country,
          price,
          description,
          project,
        }
      );
      res.json(true);
    } catch (error) {
      res.status(500).json({ error: "Error updating contact" });
    }
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      try {
        await Contact.deleteOne({ _id: req.query?.id });
        res.json(true);
      } catch (error) {
        res.status(500).json({ error: "Error deleting contact" });
      }
    }
  }
}
