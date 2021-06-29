const mongoose = require('mongoose')

const contactShema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
})

const Contact = mongoose.model('Contacts', contactShema)

module.exports = {
   Contact
}