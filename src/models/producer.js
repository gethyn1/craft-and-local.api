// @flow

import mongoose, { Schema } from 'mongoose'

const ProducerSchema = Schema({
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
    type: { type: Boolean, default: false },
  },
  boxScheme: {
    type: { type: Boolean, default: false },
  },
  latLng: {
    lat: Number,
    lng: Number,
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      min: [2, 'Coordinates must contain 2 points'],
      max: [2, 'Coordinates must contain 2 points']
    }
  }
})

export default mongoose.model('Producer', ProducerSchema)
