const express = require('express')
const router = express.Router()
const {
  registrationController,
  registrationConfirmationController,
  secondRegConfController,
  loginController,
  logoutController,
  getCurrentUserController
} = require('../../controllers/authControllers')
const { secondConfirmEmailMiddleware } = require('../../middlewares/validationMiddlewares')

const { asyncWrapper } = require('../../helpers/apiHelpers')
const { authMiddleware } = require('../../middlewares/authMiddleware')

// POST Registration
router.post('/signup', asyncWrapper(registrationController))

// POST login
router.post('/login', asyncWrapper(loginController))

// POST logout
router.post('/logout', authMiddleware, asyncWrapper(logoutController))

// GET Current user
router.get('/current', authMiddleware, asyncWrapper(getCurrentUserController))

// GET Verification email
router.get('/verify/:verificationToken', asyncWrapper(registrationConfirmationController))

// POST Second Verification email
router.post('/verify', secondConfirmEmailMiddleware, asyncWrapper(secondRegConfController))

module.exports = router
