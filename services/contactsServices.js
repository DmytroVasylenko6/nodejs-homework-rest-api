const { Contact } = require('../db/contactModel')
const { WrongParametersError } = require('../helpers/errors')
   
const getContacts = async () => {
    const contacts = await Contact.find({})
    return contacts
};

const getContactById = async (id) => {
    const contact = await Contact.findById(id)
     if (!contact) {
        throw new WrongParametersError(`No contact with id ${id} found`)
    }
    return contact
};

const addContact = async (name, phone, email) => {
    const contactAdd = new Contact({ name, phone, email })
    await contactAdd.save()
    return contactAdd
};

const updateContact = async (contactId, body) => {
    await Contact.findByIdAndUpdate(contactId, { $set: body })
};

const deleteContact = async (contactId) => {
   await Contact.findByIdAndDelete(contactId)
};


module.exports = {
    getContacts,
    getContactById,
    addContact,
    updateContact,
    deleteContact
}
