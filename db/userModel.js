const mongoose = require('mongoose')
const gravatar = require('gravatar')
const bcrypt = require('bcrypt')
const saltRounds = 10

const userShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Username is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: '250' }, true)
    }
  },
  idCloudAvatar: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
})
userShema.pre('save', async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, saltRounds)
  }

  // TODO: if user changed password
})

const User = mongoose.model('Users', userShema)

module.exports = {
  User
}
