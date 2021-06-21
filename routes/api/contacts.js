const express = require('express')
const router = express.Router()
const contactsAction = require('../../model/index')
const { addAndUpdateContactMiddleware } = require('../../middlewares/validationMiddlewares')

// GET ContactList
router.get('/', async (req, res) => {
  const contacts = await contactsAction.listContacts()
  res.status(200).json({ contacts: contacts, status: 'success' })
})

// GET Contact by ID
router.get('/:contactId', async (req, res) => {
  const contactId = req.params.contactId
  const contact = await contactsAction.getContactById(contactId)

  if (contact) {
    res.status(200).json({ contact: contact, status: 'success' })
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

// POST Add Contact
router.post('/', addAndUpdateContactMiddleware, async (req, res) => {
  const contactAdd = await contactsAction.addContact(req.body)
  res.status(200).json({ contact: contactAdd, status: 'success' })
})

// DELETE Delete contact
router.delete('/:contactId', async (req, res) => {
  const contactId = req.params.contactId
  const contact = await contactsAction.removeContact(contactId)
  console.log(contact)
  if (contact) {
    res.status(200).json({ message: `contact "${contact.name}" is deleted`, status: 'success' })
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

// PUT Update contact
router.put('/:contactId', addAndUpdateContactMiddleware, async (req, res) => {
  const contactId = req.params.contactId
  const contactUpdate = await contactsAction.updateContact(contactId, req.body)
  res.status(200).json({ updatedContact: contactUpdate, status: 'success' })
})

module.exports = router
