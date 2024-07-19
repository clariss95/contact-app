const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc get all contacts
//@route GET api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    console.log("Request user:", req.user.id); // Log the user ID for debugging
    const contacts = await Contact.find({ user_id: req.user.id });
    console.log("Contacts found:", contacts); // Log the contacts for debugging
    res.status(200).json(contacts);
});

//@desc create contact
//@route POST api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
    console.log("Request user:", req.user); // Log the user for debugging
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id, // Ensure this is set
    });
    console.log("Contact created:", contact); // Log the created contact for debugging
    res.status(201).json(contact);
});

//@desc update individual contact
//@route PUT api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found.");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User does not have permission to update other user's contact.");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
});

//@desc delete individual contact
//@route DELETE api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found.");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User does not have permission to delete other user's contact.");
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Contact deleted successfully.' });
});

module.exports = { getContacts, createContact, updateContact, deleteContact };
