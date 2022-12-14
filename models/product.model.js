const mongoose = require('mongoose')

const ProductsSchema = mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Products', ProductsSchema)