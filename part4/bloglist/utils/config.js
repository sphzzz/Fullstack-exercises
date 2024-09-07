require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://shanpeihao:sph980417@cluster0.ek5my.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

module.exports = {
  PORT,
  MONGO_URL
}
