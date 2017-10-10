// @flow

import mongoose, { Schema } from 'mongoose'

const LocalitySchema = Schema({
  title: {
    type: String,
    required: 'Title is required',
  },
  slug: {
    type: String,
    required: 'Slug is required',
    unique: true,
  },
})

export default mongoose.model('Locality', LocalitySchema)
