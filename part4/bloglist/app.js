const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const Blog = require('./models/blog')
const User = require('./models/user')
const app = express()
require('dotenv').config()

mongoose.connect(config.mongoUrl)
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor) 
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.post('/api/testing/reset', async (req, res) => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    res.status(204).end();
  });
module.exports = app