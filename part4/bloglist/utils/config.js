require('dotenv').config()
const mongoUrl = process.env.MONGODB_URI
const PORT = process.env.PORT || 3003
const SECRET = process.env.SECRET
module.exports = {
  mongoUrl,
  PORT,
  SECRET
}