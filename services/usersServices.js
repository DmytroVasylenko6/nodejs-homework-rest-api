const { User } = require('../db/userModel')
const { NotAuthorizedError, VerificationError } = require('../helpers/errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const sgMail = require('@sendgrid/mail')
const cloudinaryHelpers = require('../helpers/cloudinaryHelpers')
const fs = require('fs/promises')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const userRegistration = async (email, password, name) => {
  const verificationCode = 'test' // uuidv4()
  const user = new User({ email, password, name, verifyToken: verificationCode })
  console.log('userRegistration  user:', user)
  await user.save()

  sgMail
    .send(messageConfirm(email, verificationCode))
    .then((response) => {
      console.log(response)
      console.log('Verification email sent successfully')
    }, error => {
      console.error('Error sending verification email:', error)

      if (error.response) {
        console.error(error.response.body)
      }
    })
}

const userRegistrationConfirmation = async (code) => {
  const user = await User.findOne({ verifyToken: code, verify: false })

  if (!user) {
    throw new VerificationError('No user found')
  }

  user.verify = true
  await user.save()

  sgMail
    .send(messageIsRegistered(user.email))
    .then(() => {}, error => {
      console.error(error)

      if (error.response) {
        console.error(error.response.body)
      }
    })
}

const secondUserRegConfirmation = async (email) => {
  const verificationCode = uuidv4()
  const user = await User.findOne({ email: email })

  if (!user) {
    throw new VerificationError('No user found')
  }

  if (user.verify === true) {
    throw new VerificationError('Verification has already been passed')
  }

  user.verifyToken = verificationCode
  await user.save()

  sgMail
    .send(messageConfirm(email, verificationCode))
    .then(() => {}, error => {
      console.error(error)

      if (error.response) {
        console.error(error.response.body)
      }
    })
}

const userLogin = async (email, password) => {
  const user = await User.findOne({ email, verify: true })

  if (!user) {
    throw new NotAuthorizedError(`No user with email '${email}' found`)
  }

  if (!await bcrypt.compare(password, user.password)) {
    throw new NotAuthorizedError('Wrong password')
  }

  const token = jwt.sign({
    _id: user._id,
  }, process.env.JWT_SECRET)

  await User.findByIdAndUpdate(user._id, { $set: { token } })

  return token
}

const userLogOut = async (userId) => {
  await User.findByIdAndUpdate(userId, { $set: { token: null } })
}

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId)
  return user
}

const updateUserAvatar = async (userId, pathFile) => {
  try {
    /** Upload new avatar to cloud */
    const {
      secure_url: avatar,
      public_id: idCloudAvatar
    } = await cloudinaryHelpers.uploadAvatar(pathFile)

    const user = await User.findById(userId)

    if (user.idCloudAvatar) {
      /** Delete the old avatar from the cloud */
      await cloudinaryHelpers.deleteOldAvatar(user.idCloudAvatar)
    }
    await User.findByIdAndUpdate(userId, { $set: { avatarURL: avatar, idCloudAvatar } })

    await fs.unlink(pathFile)
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = {
  userRegistration,
  userRegistrationConfirmation,
  secondUserRegConfirmation,
  userLogin,
  userLogOut,
  getCurrentUser,
  updateUserAvatar
}

function messageIsRegistered(email) {
  return {
    to: email,
    from: 'tredstoun651@ukr.net', // Use the email address or domain you verified above
    subject: 'Thanks you for registration!',
    text: 'Congratulations, you have successfully registered!',
    html: '<p>Congratulations, you have successfully registered!</p>'
  }
};

function messageConfirm(email, code) {
  console.log(email)
  return {
    to: email,
    from: 'tredstoun651@ukr.net', // Use the email address or domain you verified above
    subject: 'Thanks you for registration!',
    text: `Please, confirm your email address GET http://localhost:3020/api/users/verify/${code}`,
    html: `<p>Please, confirm your email address GET http://localhost:3020/api/users/verify/${code}</p>`,
  }
};
