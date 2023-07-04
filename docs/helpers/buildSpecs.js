
module.exports = (specs = {}) => {
  try {
    const customSpecsFiles = [
      require('../specs/users/current'),
      require('../specs/users/login'),
      require('../specs/users/signup'),
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
