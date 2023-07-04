const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/auth')
const filesRouter = require('./routes/api/files')
const { errorHandler } = require('./helpers/apiHelpers')
const app = express()
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const buildSpecs = require('./docs/helpers/buildSpecs')
const swaggerOptions = require('./docs/options')
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

const swaggerDocs = swaggerJsDoc(swaggerOptions)
swaggerDocs.paths = buildSpecs(swaggerDocs.paths)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)
app.use('/api/files', filesRouter)
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})
app.use(errorHandler)

module.exports = app
