const fs = require('fs').promises
const Jimp = require('jimp')
const {
  userRegistration,
  userRegistrationConfirmation,
  secondUserRegConfirmation,
  userLogin,
  userLogOut,
  updateUserAvatar
} = require('../services/usersServices')

const registrationController = async (req, res) => {
  const { email, password, name } = req.body
  await userRegistration(email, password, name)

  res.json({ status: 'success' })
}

const registrationConfirmationController = async (req, res) => {
  const { verificationToken } = req.params
  await userRegistrationConfirmation(verificationToken)
  res.redirect('/')
  // res.json({ status: 'Verification successful' })
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
  res.json({
    status: 'success',
    user: {
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
      subscription: user.subscription
    }
  })
}

const uploadAvatarController = async (req, res, next) => {
  const userId = req.user._id
  const { description } = req.body
  const { path: temporaryName } = req.file

  try {
    const img = await Jimp.read(temporaryName)
    await img
      .autocrop()
      .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
      .writeAsync(temporaryName)

    await updateUserAvatar(userId, temporaryName)
    res.json({ description, message: 'File uploaded successfully', status: 200 })
  } catch (err) {
    await fs.unlink(temporaryName)
    console.error('', err.message)
    return next(err)
  }
}

module.exports = {
  registrationController,
  registrationConfirmationController,
  secondRegConfController,
  loginController,
  logoutController,
  getCurrentUserController,
  uploadAvatarController
}
