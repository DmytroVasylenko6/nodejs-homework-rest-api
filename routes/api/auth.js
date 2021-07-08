const express = require('express')
const router = express.Router()
const {
    registrationController,
    loginController,
    logoutController,
    getCurrentUserController
} = require('../../controllers/authControllers')

const { asyncWrapper } = require('../../helpers/apiHelpers')
const { authMiddleware} = require('../../middlewares/authMiddleware')

// POST Registration
router.post('/signup', asyncWrapper(registrationController))

// POST login
router.post('/login', asyncWrapper(loginController))

// POST logout
router.post('/logout', authMiddleware, asyncWrapper(logoutController))

// GET Current user
router.get('/current', authMiddleware, asyncWrapper(getCurrentUserController))


module.exports = router
