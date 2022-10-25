const mongoose = require('mongoose')

const ReviewsSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: false,
    default: 0
  },
})

module.exports = mongoose.model('Reviews', ReviewsSchema)