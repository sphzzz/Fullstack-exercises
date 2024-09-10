// utils/list_helper.js
const dummy = (blogs) => {
    return 1
  }
  
  const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }
  
  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
  
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
    if (blogs.length === 0) return null
  
    const authorBlogCounts = blogs.reduce((acc, blog) => {
      acc[blog.author] = (acc[blog.author] || 0) + 1
      return acc
    }, {})
  
    const topAuthor = Object.keys(authorBlogCounts).reduce((a, b) => {
      return authorBlogCounts[a] > authorBlogCounts[b] ? a : b
    })
  
    return {
      author: topAuthor,
      blogs: authorBlogCounts[topAuthor]
    }
  }
  
  const mostLikes = (blogs) => {
    if (blogs.length === 0) return null
  
    const authorLikeCounts = blogs.reduce((acc, blog) => {
      acc[blog.author] = (acc[blog.author] || 0) + blog.likes
      return acc
    }, {})
  
    const topAuthor = Object.keys(authorLikeCounts).reduce((a, b) => {
      return authorLikeCounts[a] > authorLikeCounts[b] ? a : b
    })
  
    return {
      author: topAuthor,
      likes: authorLikeCounts[topAuthor]
    }
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }