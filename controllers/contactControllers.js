
const {
    getContacts,
    getContactById,
    addContact,
    updateContact,
    deleteContact
} = require('../services/contactsServices')

const listContactsController = async (req, res) => {
  const contacts = await getContacts()
  res.status(200).json({ contacts: contacts, status: 'success' })
}

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params
  const contact = await getContactById(contactId)
  res.status(200).json({ contact: contact, status: 'success' })
}

const removeContactController = async (req, res) => {
  const { contactId } = req.params
  const contact = await getContactById(contactId)
  await deleteContact(contactId)
  res.status(200).json({ message: `contact "${contact.name}" is deleted`, status: 'success' })
}

const addContactController = async (req, res) => {
  const { name, phone, email } = req.body
  const contactAdd = await addContact(name, phone, email)
  res.status(200).json({ contact: contactAdd, status: 'success' })
}

const updateContactController = async (req, res) => {
  const { name, phone, email } = req.body
  const { contactId } = req.params
  await getContactById(contactId)
  await updateContact(contactId, { name, phone, email })
  res.status(200).json({ status: 'success' })
}

const updateFavoriteController = async (req, res) => {
  const { favorite } = req.body
  const { contactId } = req.params
  await getContactById(contactId)
  console.log(favorite)
  await updateContact(contactId, { favorite })
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
