
const {
    getContacts,
    getContactById,
    addContact,
    updateContact,
    deleteContact
} = require('../services/contactsServices')

const listContactsController = async (req, res) => {
  const userId = req.user._id
  const contacts = await getContacts(userId)
  res.status(200).json({ contacts: contacts, status: 'success' })
}

const getContactByIdController = async (req, res) => {
  const contactId  = req.params.contactId
  const userId = req.user._id
  const contact = await getContactById(contactId, userId)
  res.status(200).json({ contact: contact, status: 'success' })
}

const addContactController = async (req, res) => {
  const { name, phone, email } = req.body
  const userId = req.user._id
  const contactAdd = await addContact(name, phone, email, userId)
  res.status(201).json({ contact: contactAdd, status: 'success' })
}

const updateContactController = async (req, res) => {
  const { name, phone, email } = req.body
  const contactId = req.params.contactId
  const userId = req.user._id
  await getContactById(contactId, userId)
  await updateContact(contactId, { name, phone, email }, userId)
  res.status(200).json({ status: 'success' })
}

const removeContactController = async (req, res) => {
  const contactId  = req.params.contactId
  const userId = req.user._id
  const contact = await getContactById(contactId, userId)
  await deleteContact(contactId)
  res.status(200).json({ message: `contact "${contact.name}" is deleted`, status: 'success' })
}

const updateFavoriteController = async (req, res) => {
  const { favorite } = req.body
  const contactId  = req.params.contactId
  const userId = req.user._id
  await getContactById(contactId, userId)
  await updateContact(contactId, { favorite }, userId)
  res.status(200).json({ status: 'success' })
}

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateFavoriteController,
}
