// utils/list_helper.js

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  
  const favorite = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorBlogCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    return counts
  }, {})

  const topAuthor = Object.keys(authorBlogCounts).reduce((top, author) => {
    return authorBlogCounts[author] > authorBlogCounts[top] ? author : top
  })

  return {
    author: topAuthor,
    blogs: authorBlogCounts[topAuthor]
  }
}

// Function to find the author with the most likes
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorLikes = blogs.reduce((likes, blog) => {
    likes[blog.author] = (likes[blog.author] || 0) + blog.likes
    return likes
  }, {})

  const topAuthor = Object.keys(authorLikes).reduce((top, author) => {
    return authorLikes[author] > authorLikes[top] ? author : top
  })

  return {
    author: topAuthor,
    likes: authorLikes[topAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

