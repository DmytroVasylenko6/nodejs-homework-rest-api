const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const uploadDir = path.join(process.cwd(), process.env.UPLOAD_DIR)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: async (req, file, cb) => {
    const [, extension] = file.originalname.split('.')
    const fileName = uuidv4()
    cb(null, `${fileName}.${extension}`)
  },
  limits: {
    fileSize: 1048576,
  },
})

const uploadAvatarMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: 1048576,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true)
      return
    }
    cb(null, false)
  },
})

module.exports = {
  uploadAvatarMiddleware
}
