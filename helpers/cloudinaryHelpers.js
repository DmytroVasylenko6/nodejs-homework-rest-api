const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

function uploadAvatar(pathFile) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(pathFile, {
      folder: 'Avatars',
    }, (error, result) => error ? reject(error) : resolve(result))
  })
}

function deleteOldAvatar(idCloudAvatar) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(idCloudAvatar, (error, result) => error ? reject(error) : resolve(result))
  })
}

module.exports = {
  uploadAvatar,
  deleteOldAvatar
}
