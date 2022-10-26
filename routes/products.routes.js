const express = require('express')
const router = express.Router()
const Product = require('../models/product.model')
const verify = require('./verifyToken')

router.get('/', async (req, res) => {
  try {
    const response = await Product.find({ userId: req.user })
    const products = response.map(product => {
      return {
        title: product.title,
        text: product.text,
        img: product.img,
        id: product._id
      }
    })
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

module.exports = router