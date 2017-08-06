// @flow

import request from 'request'

import categories from '../data/categories'
import producers from '../data/producers'

import Producer from '../models/producer'

export const getProducers = (query: Object) =>
  new Promise((resolve, reject) => {
    // Create an empty filters object for querying the database.
    const filters = {}

    if (query.hasOwnProperty('latlng')) {
      // Filter results by location (nearest to furthest).
      const latLngArr = query.latlng.split(',')
      const lat = latLngArr[0]
      const lng = latLngArr[1]

      filters.location = {
        $near: {
          $geometry: { type: "Point",  coordinates: [ lng, lat ] },
          $maxDistance : 100000
        }
      }
    }

    if (query.hasOwnProperty('categories_like')) {
      // Find producers in category.
      filters.categories = query.categories_like
    }

    Producer
      .find(filters)
      .populate('categories')
      .exec((err, results) => {
        if (err) {
          reject({
            status: 'error',
            data: {
              title: err,
            },
          })
        }

        resolve({
          status: 'success',
          data: {
            producers: results,
          },
        })
      })
  })

export const getProducer = (user_id: string) =>
  new Promise((resolve, reject) => {
    Producer
      .findOne({ user_id })
      .populate('categories')
      .exec((err, results) => {
        if (err) {
          reject({
            status: 'error',
            data: {
              title: err,
            },
          })
        }

        resolve({
          status: 'success',
          data: {
            producer: results,
          },
        })
      })
  })

export const getProducerInstagramFeed = (handle: string) =>
  new Promise((resolve, reject) => {
    request({
      url: `https://www.instagram.com/${handle}/media/`,
      json: true
    }, (err, response, body) => {

      if (!err && response.statusCode === 200) {
        resolve({
          status: 'success',
          data: body.items,
        })
      }

      reject({
        status: 'error',
        data: {
          title: err,
        },
      })
    })
  })
