const express = require('express')
const { Review } = require('../models/review.model')
const verify = require('./verifyToken')

const router = express.Router()

router.post('/:productId', verify, async (req, res) => {
  const review = new Review({
    productId: req.params.productId,
    userId: req.user,
    text: req.body.text,
    rate: req.body.rate,
  })

  try {
    const response = await review.save()

    res.status(200).json({ review_id: response._id })
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

router.get('/:productId', verify, async (req, res) => {
  try {
    const response = await Review.aggregate([{ $set: { userId: { $toObjectId: "$userId" } } }])
      .match({ productId: req.params.productId })
      .lookup({
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'created_by',
        pipeline: [
          { '$project': { '_id': 1, 'username': 1 } }
        ]
      })

    const reviews = response.map(review => {
      return {
        created_by: review.created_by[0],
        text: review.text,
        productId: review.productId,
        rate: review.rate,
        reviewId: review._id
      }
    })
    res.status(200).json(reviews.reverse())
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

module.exports = router