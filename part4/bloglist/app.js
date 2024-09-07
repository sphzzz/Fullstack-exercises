const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

const app = express()

// Connect to MongoDB
mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/blogs', blogsRouter)

// Middleware for handling unknown endpoints and errors
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
