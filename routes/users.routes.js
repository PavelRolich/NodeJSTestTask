const express = require('express')
const { User, UserActivity } = require('../models/user.model')
const jwt = require('jsonwebtoken')
const verify = require('./verifyToken')

const router = express.Router()

router.post('/register', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  })

  try {
    const usernameExist = await User.findOne({ username: req.body.username })
    if (usernameExist) return res.status(400).json({ message: 'Username already exist' })

    const response = await user.save()
    const token = jwt.sign({ _id: response._id }, process.env.TOKEN_SECRET)

    const userActivity = new UserActivity({
      userId: response._id,
      loginDate: new Date(),
    })

    await userActivity.save()

    res.status(200).json({ success: true, token })
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(400).json({ message: 'Username is not found' })
    if (req.body.password !== user.password) return res.status(400).json({ message: 'Invalid password' })

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)

    const userActivity = new UserActivity({
      userId: user._id,
      loginDate: new Date(),
    })

    await userActivity.save()
    res.status(200).json({ success: true, token })
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

router.post('/logout', verify, async (req, res) => {
  try {
    await UserActivity.updateOne(
      { userId: req.user },
      {
        $set: { logoutDate: new Date() }
      }
    )

    const successMessage = 'User successfully logged out'
    res.status(200).json({ message: successMessage })
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

module.exports = router