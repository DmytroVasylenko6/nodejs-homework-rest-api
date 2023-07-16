const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/user')
const { errorHandler } = require('./helpers/apiHelpers')
const app = express()
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const buildSpecs = require('./docs/helpers/buildSpecs')
const swaggerOptions = require('./docs/options')
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
const config = require('config')

const swaggerDocs = swaggerJsDoc(swaggerOptions)
swaggerDocs.paths = buildSpecs(swaggerDocs.paths)

// const corsOptions = {
//   origin: config.get('allowedSignupOrigins'),
//   optionsSuccessStatus: 204,
// }

// console.log(corsOptions.origin)

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, {
  customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
  ],
  customSiteTitle: 'Phonebook API documentation',
}))
app.get('/', function (req, res) {
  res.redirect('https://androsenkoartem.github.io/goit-react-hw-08-phonebook/')
})
app.use('/api/test', (req, res) => { res.json({ message: 'test' }) })
app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})
app.use(errorHandler)

module.exports = app
