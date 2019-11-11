const config = require('./utils/config')
const express = require('express')
const path = require('path') // Tämä tarvii olla täällä, jotta routet toimisi oikein myös production-versiossa
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
const { tokenExtractor, errorHandler } = require('./utils/middleware')

const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build')) // Tämä tarvii olla täällä, jotta routet toimisi oikein myös production-versiossa

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
}) // Tämä tarvii olla täällä, jotta routet toimisi oikein myös production-versiossa


if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testRouter')
  app.use('/api/testing', testingRouter)
}

app.use(errorHandler)

module.exports = app