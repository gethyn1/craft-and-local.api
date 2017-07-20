// @flow

import mongoose, { Schema } from 'mongoose'

const CategorySchema = Schema({
  title: {
    type: String,
    required: 'Title is required',
  },
})

export default mongoose.model('Category', CategorySchema)
