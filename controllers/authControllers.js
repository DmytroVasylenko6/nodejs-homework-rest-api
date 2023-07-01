const {
  userRegistration,
  userRegistrationConfirmation,
  secondUserRegConfirmation,
  userLogin,
  userLogOut
} = require('../services/usersServices')

const registrationController = async (req, res) => {
  const { email, password } = req.body
  await userRegistration(email, password)

  res.json({ status: 'success' })
}

const registrationConfirmationController = async (req, res) => {
  const { verificationToken } = req.params
  await userRegistrationConfirmation(verificationToken)
  res.json({ status: 'Verification successful' })
}

const secondRegConfController = async (req, res) => {
  const { email } = req.body
  await secondUserRegConfirmation(email)
  res.json({ status: 'Verification email sent' })
}

const loginController = async (req, res) => {
  const { email, password } = req.body
  const token = await userLogin(email, password)
  res.json({ status: 'success', token })
}

const logoutController = async (req, res) => {
  const userId = req.user._id
  await userLogOut(userId)
  res.json({ status: '204 No Content' })
}

const getCurrentUserController = async (req, res) => {
  const user = req.user
  res.json({ status: 'success', currentUser: { email: user.email, subscription: user.subscription } })
}

module.exports = {
  registrationController,
  registrationConfirmationController,
  secondRegConfController,
  loginController,
  logoutController,
  getCurrentUserController
}
