const mongoose = require('mongoose')

const uriDb = process.env.DB_HOST

const connectMongoDb = async () => {
  return mongoose.connect(uriDb,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
}

module.exports = {
  connectMongoDb
}
