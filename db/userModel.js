const mongoose = require('mongoose')
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userShema = new mongoose.Schema({
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
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: '250' }, true)
    }
  },
})
userShema.pre('save', async function () {
    if (this.isNew) {
        this.password =  await bcrypt.hash(this.password, saltRounds)
    }
    
    //TODO: if user changed password 
})


const User = mongoose.model('Users', userShema)

module.exports = {
   User
}