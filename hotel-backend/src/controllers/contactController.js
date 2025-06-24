import Contact from "../models/Contact.js";

export const submitContactForm = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Message received", contact });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
