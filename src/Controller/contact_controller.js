const Contact = require("../Models/contact_model");

// Create a new contact
const createContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json({
      savedContact: savedContact,
      success: true,
      message: "Contact created successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: "Could not create contact" });
  }
};

// Read all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      contacts: contacts,
      success: true,
      message: "Contacts retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch contacts" });
  }
};

module.exports = {
  createContact,
  getAllContacts,
};
