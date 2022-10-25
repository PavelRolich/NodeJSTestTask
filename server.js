const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors());

require('dotenv/config')

const mongoose = require('mongoose')
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log('Mongo Hello')
})

const productsRoute = require('./routes/products.routes')
const usersRoute = require('./routes/users.routes')
const reviewsRoute = require('./routes/reviews.routes')

app.use('/api/products', productsRoute)
app.use('/api/user', usersRoute)
app.use('/api/reviews', reviewsRoute)

app.get('/', (req, res) => {
  res.send({ message: 'I\'m alive!' })
})

app.listen(3000)