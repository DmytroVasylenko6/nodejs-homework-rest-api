const {
    updateUserAvatar,
} = require('../services/usersServices')
const path = require('path')
const storeAvatars = path.join(process.cwd(), 'public/avatars')
const fs = require('fs').promises
const Jimp = require('jimp');

const uploadController = async (req, res) => {

  const avatarURL = req.avatarName
  const userId = req.user._id
  const { description } = req.body
  const { path: temporaryName, filename } = req.file
  const fileName = path.join(storeAvatars, filename)

  try {
    const img = await Jimp.read(temporaryName)
    await img
      .autocrop()
      .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
      .writeAsync(temporaryName)
    
    await fs.rename(temporaryName, fileName)
    await updateUserAvatar(userId, avatarURL)

  } catch (err) {
    await fs.unlink(temporaryName)
    return next(err)
  }
  res.json({ description, message: 'File uploaded successfully', status: 200 })
}

module.exports = {
    uploadController,
}