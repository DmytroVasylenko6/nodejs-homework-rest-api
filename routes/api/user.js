const express = require('express')
const router = express.Router()
const {
  registrationController,
  registrationConfirmationController,
  secondRegConfController,
  loginController,
  logoutController,
  getCurrentUserController,
  uploadAvatarController
} = require('../../controllers/userControllers')
const { secondConfirmEmailMiddleware } = require('../../middlewares/validationMiddlewares')

const { asyncWrapper } = require('../../helpers/apiHelpers')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const { uploadAvatarMiddleware } = require('../../middlewares/uploadAvatarMiddleware')

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

// POST Upload user avatar
router.patch('/uploadAvatar', [uploadAvatarMiddleware.single('avatar'), authMiddleware], asyncWrapper(uploadAvatarController))

module.exports = router
