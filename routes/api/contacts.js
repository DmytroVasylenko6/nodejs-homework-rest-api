const express = require('express')
const router = express.Router()
const {
  listContactsController,
  addContactController,
  getContactByIdController,
  updateContactController,
  removeContactController,
  updateFavoriteController
} = require('../../controllers/contactControllers')
const {
  addAndUpdateContactMiddleware,
  updateFavoriteMiddleware } = require('../../middlewares/validationMiddlewares')
  
const { authMiddleware} = require('../../middlewares/authMiddleware')
const { asyncWrapper } = require('../../helpers/apiHelpers')

router.use(authMiddleware)

// GET ContactList
router.get('/', asyncWrapper(listContactsController))

// GET Contact by ID
router.get('/:contactId', asyncWrapper(getContactByIdController))

// POST Add Contact
router.post('/', addAndUpdateContactMiddleware, asyncWrapper(addContactController))

// DELETE Delete contact
router.delete('/:contactId', asyncWrapper(removeContactController))

// PUT Update contact
router.put('/:contactId', addAndUpdateContactMiddleware, asyncWrapper(updateContactController))

// PATCH Update favorite
router.patch('/:contactId', updateFavoriteMiddleware, asyncWrapper(updateFavoriteController))

module.exports = router
