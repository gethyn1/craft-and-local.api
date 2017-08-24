// @flow

import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const UserSchema = Schema({
  email: {
    type: String,
    required: 'Email is required',
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: 'Password is required',
  },
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user']
  },
  created: {
    type: Date,
    default: Date.now
  },
})

// Hash password before saving to database
UserSchema.pre('save', function(next) {
  const user = this
  const SALT_FACTOR = 5

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

// Compare database password hash with user submitted password
UserSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) reject(err)
      resolve(isMatch)
    })
  })
}

export default mongoose.model('User', UserSchema)
