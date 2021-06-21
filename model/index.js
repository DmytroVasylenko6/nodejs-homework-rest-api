const fs = require('fs/promises')
const uid = require('uid');
const path = require('path');
const contactsPath = path.join('./model/contacts.json');

const listContacts = async () => {
   try {
    const response = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(response);
    return  contacts
  } catch (error) {
     return { message: error }
  }
}

const getContactById = async (contactId) => {
   try {
    const response = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(response);
    const findContact = contacts.find(contact => contact.id == contactId);
    return findContact
  } catch (error) {
     return { message: error }
  }

}

const removeContact = async (contactId) => {
    try {
      const response = await fs.readFile(contactsPath, 'utf8');
      let contacts = JSON.parse(response);
      const contactDel = contacts.find(contact => contact.id == contactId);
      contacts = contacts.filter(contact => contact.id != contactId);
      fs.writeFile(contactsPath, `${JSON.stringify(contacts, null, 2)}`, 'utf8');
      return contactDel
  } catch (error) {
     return { message: error }
  }
}

const addContact = async (body) => {
 const {name, phone, email } = body

  try {
    const response = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(response);
    contacts.push({ id: uid.uid(), name: name, email: email, phone: phone });
    fs.writeFile(contactsPath, `${JSON.stringify(contacts, null, 2)}`);
    return { id: uid.uid(), name: name, email: email, phone: phone }
  } catch (error) {
    return { message: error }
  }
}

const updateContact = async (contactId, body) => {
  const {name, phone, email } = body

  try {
    const response = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(response);
    let updatedContact = {};
      contacts.forEach(contact => {
      if (contact.id == contactId) {
        contact.name = name;
        contact.phone = phone;
        contact.email = email;

       updatedContact = { id: contact.id, name:  contact.name, email: contact.email, phone: contact.phone }
      }
    })
    fs.writeFile(contactsPath, `${JSON.stringify(contacts, null, 2)}`);
    return updatedContact;

  } catch (error) {
    return { message: error }
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
