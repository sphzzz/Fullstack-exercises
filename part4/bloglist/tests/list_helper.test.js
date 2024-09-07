// tests/list_helper.test.js

const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  // Tests for totalLikes...

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.example.com',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://www.example.com',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://www.example.com',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422be81b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://www.example.com',
      likes: 2,
      __v: 0
    }
  ]

  describe('most likes', () => {
    test('when list is empty, returns null', () => {
      const result = listHelper.mostLikes([])
      assert.strictEqual(result, null)
    })

    test('when list has multiple blogs, returns the author with the most likes', () => {
      const result = listHelper.mostLikes(listWithMultipleBlogs)
      const expected = {
        author: 'Edsger W. Dijkstra',
        likes: 17 // 5 + 12 = 17
      }
      assert.deepStrictEqual(result, expected)
    })

    test('when list has only one blog, return the author of that blog with their likes', () => {
      const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
          likes: 5,
          __v: 0
        }
      ]

      const result = listHelper.mostLikes(listWithOneBlog)
      const expected = {
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
      assert.deepStrictEqual(result, expected)
    })
  })
})
