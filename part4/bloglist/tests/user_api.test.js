const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)
jest.setTimeout(20000) // 设置超时时间为 20 秒
beforeEach(async () => {
  await User.deleteMany({})
})

test('a valid user can be added', async () => {
  const newUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'password123'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await User.find({})
  expect(usersAtEnd).toHaveLength(1)
  expect(usersAtEnd[0].username).toBe(newUser.username)
})

test('user without username is not added', async () => {
  const newUser = {
    name: 'Test User',
    password: 'password123'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toBe('username must be at least 3 characters long')

  const usersAtEnd = await User.find({})
  expect(usersAtEnd).toHaveLength(0)
})

test('user with short username is not added', async () => {
  const newUser = {
    username: 'tu',
    name: 'Test User',
    password: 'password123'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toBe('username must be at least 3 characters long')

  const usersAtEnd = await User.find({})
  expect(usersAtEnd).toHaveLength(0)
})

test('user without password is not added', async () => {
  const newUser = {
    username: 'testuser',
    name: 'Test User'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toBe('password must be at least 3 characters long')

  const usersAtEnd = await User.find({})
  expect(usersAtEnd).toHaveLength(0)
})

test('user with short password is not added', async () => {
  const newUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'pw'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toBe('password must be at least 3 characters long')

  const usersAtEnd = await User.find({})
  expect(usersAtEnd).toHaveLength(0)
})

test('user with non-unique username is not added', async () => {
  const newUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'password123'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toBe('username must be unique')

  const usersAtEnd = await User.find({})
  expect(usersAtEnd).toHaveLength(1)
})

afterAll(() => {
  mongoose.connection.close()
})