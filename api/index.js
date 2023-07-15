require('dotenv').config()
const { connectMongoDb } = require('../db/connection')
const app = require('../app')
const path = require('path')
const { createFolderIsNotExist } = require('../helpers/createFolder')

const UPLAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR)

const PORT = process.env.PORT || 3020

const start = async () => {
  try {
    await connectMongoDb()
    console.log('Database connection successful')

    app.listen(PORT, async () => {
      await createFolderIsNotExist(UPLAD_DIR)
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (error) {
    console.error(`Failed to launch aplication with error: ${error.message}`)
    process.exit(1)
  }
}

start()
