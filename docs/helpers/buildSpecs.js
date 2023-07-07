
module.exports = (specs = {}) => {
  try {
    const customSpecsFiles = [
      /** Users */
      require('../specs/users/current'),
      require('../specs/users/login'),
      require('../specs/users/signup'),
      require('../specs/users/logout'),
      require('../specs/users/verify'),
      require('../specs/users/verifyResend'),
      /** Contacts */
      require('../specs/contacts/getAll'),
      require('../specs/contacts/getById'),
      require('../specs/contacts/add'),
      require('../specs/contacts/delete'),
      require('../specs/contacts/update'),
      require('../specs/contacts/updateFavorite'),
      /** Files */
    ]

    const specsFromFiles = customSpecsFiles.reduce((acc, file) => {
      const pathKeys = Object.keys(file.paths)
      const path = pathKeys[0] // Use only first path (should be only one path per file)
      const pathConfig = file.paths[path]

      if (!acc[path]) {
        acc[path] = pathConfig
      } else {
        const methodKeys = Object.keys(pathConfig)
        const method = methodKeys[0] // Use only first method (should be only one method per path)
        acc[path][method] = pathConfig[method]
      }

      return acc
    }, {})

    return {
      ...specs,
      ...specsFromFiles
    }
  } catch (err) {
    console.error('Error building swagger specs', err)
  }
}
