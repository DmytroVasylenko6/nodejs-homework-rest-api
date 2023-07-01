const { Contact } = require('../db/contactModel')
const { WrongParametersError } = require('../helpers/errors')

const getContacts = async (userId) => {
  const contacts = await Contact.find({ userId })
  return contacts
}

const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, owner: userId })
  if (!contact) {
    throw new WrongParametersError(`No contact with id ${contactId} found`)
  }
  return contact
}

const addContact = async (name, phone, email, userId) => {
  const contactAdd = new Contact({ name, phone, email, owner: userId })
  await contactAdd.save()
  return contactAdd
}

const updateContact = async (contactId, body, userId) => {
  await Contact.findOneAndUpdate({ _id: contactId, owner: userId }, { $set: body })
}

const deleteContact = async (contactId, userId) => {
  await Contact.findOneAndDelete({ _id: contactId, owner: userId })
}

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact
}
