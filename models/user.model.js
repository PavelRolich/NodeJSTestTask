const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const UserActivitySchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  loginDate: {
    type: Date,
    default: Date.now
  },
  logoutDate: {
    type: Date,
    default: null
  }
})

module.exports = {
  User: mongoose.model('Users', UserSchema),
  UserActivity: mongoose.model('UsersActivity', UserActivitySchema),
}