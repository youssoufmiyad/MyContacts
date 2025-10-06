import Contact from "../models/Contact.js";
import { generateContactSlug } from "../utils/generateSlug.js";
import { EMAIL_REGEX, PHONE_REGEX } from "../utils/regex.js";

async function getContacts(req, res) {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function getContactById(req, res) {
  const contactId = req.params.id;

  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function getContactBySlug(req, res) {
  const contactSlug = req.params.slug;

  try {
    const contact = await Contact.findOne({ slug: contactSlug });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function modifyContact(req, res) {
  const contactId = req.params.id;
  const { firstName, lastName, phone, email } = req.body;
  if (email !== undefined && !validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  if (phone !== undefined && !validatePhone(phone)) {
    return res.status(400).json({ message: "Invalid phone number format" });
  }
  try {
    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { firstName, lastName, phone, email },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.log("Error modifying contact:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function addContact(req, res) {
  const { firstName, lastName, phone, email } = req.body;
  try {
    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res.status(400).json({ message: "Email adress already used" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!validatePhone(phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }
    const slug = await generateContactSlug(firstName, lastName);

    const newContact = new Contact({
      firstName,
      lastName,
      phone,
      email,
      slug,
    });

    await newContact.save();

    res
      .status(201)
      .json({ message: "Contact created successfully", contact: newContact });
  } catch (error) {
    res.status(500).json({ message: `Server error : ${error}` });
  }
}

async function deleteContact(req, res) {
  const contactId = req.params.id;

  try {
    const contact = await Contact.findByIdAndDelete(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

function validateEmail(email) {
  return EMAIL_REGEX.test(email);
}

function validatePhone(phone) {
  return PHONE_REGEX.test(phone);
}

export default {
  getContacts,
  getContactById,
  getContactBySlug,
  modifyContact,
  addContact,
  deleteContact,
};
