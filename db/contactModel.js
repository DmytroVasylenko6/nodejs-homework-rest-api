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
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
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