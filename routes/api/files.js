const express = require('express')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid') ;
const path = require('path')
const router = express.Router()

const {
    uploadController
} = require('../../controllers/filesControllers')
const { asyncWrapper } = require('../../helpers/apiHelpers')
const { authMiddleware} = require('../../middlewares/authMiddleware')
const uploadDir = path.join(process.cwd(), 'tmp')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
    filename: async (req, file, cb) => {
        // cb(null, file.originalname)

        const [, extension] = file.originalname.split('.')
        const fileName = uuidv4()
        req.avatarName = fileName
        cb(null, `${fileName}.${extension}`)
  },
  limits: {
    fileSize: 1048576,
  },
})

const uploadMiddleware = multer({
  storage: storage,
})

// PATCH upload files
router.patch('/upload/:userId', [uploadMiddleware.single('avatar'), authMiddleware], asyncWrapper(uploadController))

// GET download files

router.use('/download', express.static('public'))


module.exports = router
