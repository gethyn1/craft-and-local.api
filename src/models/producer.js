// @flow

import mongoose, { Schema } from 'mongoose'

const ProducerSchema = Schema({
  title: {
    type: String,
    required: 'Title is required',
  },
  description: {
    type: String,
  },
  categories: {
    type: [String],
  },
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
