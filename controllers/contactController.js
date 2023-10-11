const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc get all contacts
//@route GET /api/contacts
//@access Private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

//@desc get contact for id
//@route GET /api/contacts/:id
//@access Private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404).send('Contact not found');
    }

    res.status(200).json(contact);
});

//@desc get filtered contacts by name, email, phone
//@route POST /api/contacts/search
//@access Private
const getFilteredContacts = asyncHandler(async (req, res) => {
    // Get the search text from the request body
    const searchText = req.body.searchText;
    // Filter the contacts by name, email, phone
    const filteredContacts = await Contact.find({
        user_id: req.user.id,
        $or: [
            { name: { $regex: searchText, $options: 'i' } },
            { email: { $regex: searchText, $options: 'i' } },
            { phone: { $regex: searchText, $options: 'i' } },
        ],
    });
    console.log('filteredContacts: ', filteredContacts);
    // Send the filtered contacts as response
    res.status(200).json(filteredContacts);
});

//@desc create contact
//@route POST /api/contacts
//@access Private
const createContact = asyncHandler(async (req, res) => {
    console.log('The request body is: ', req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }

    const contact = await Contact.create({
        ...req.body,
        user_id: req.user.id,
    });

    res.status(201).json(contact);
});

//@desc update contact for id
//@route PUT /api/contacts/:id
//@access Private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404).send('Contact not found');
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User is not authorized to update this contact');
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedContact);
});

//@desc delete contact for id
//@route DELETE /api/contacts/:id
//@access Private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404).send('Contact not found');
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User is not authorized to delete this contact');
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});

module.exports = { getContacts, createContact, getContact, getFilteredContacts, updateContact, deleteContact };