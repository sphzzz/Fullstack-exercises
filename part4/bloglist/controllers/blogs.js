const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET all blogs
blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

// POST a new blog
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then(result => {
    response.status(201).json(result)
  })
})

module.exports = blogsRouter
