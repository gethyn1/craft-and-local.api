// @flow

import mongoose, { Schema } from 'mongoose'

const ProducerSchema = Schema({
  avatar: {
    type: String,
    lowercase: true,
    trim: true,
  },
  user_id: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'User ID is required',
  },
  title: {
    type: String,
    required: 'Title is required',
  },
  description: {
    type: String,
  },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  delivery: {
    type: Boolean,
    default: false,
  },
  boxScheme: {
    type: Boolean,
    default: false,
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      min: [2, 'Coordinates must contain 2 points'],
      max: [2, 'Coordinates must contain 2 points'],
    }
  },
  address: {
    type: String,
  },
  locality: {
    type: String,
  },
  instagram_handle: {
    type: String,
    default: '',
  },
  twitter_handle: {
    type: String,
    default: '',
  },
  contact_email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  contact_telephone: {
    type: String,
  },
  website: {
    type: String,
  },
})

export default mongoose.model('Producer', ProducerSchema)
