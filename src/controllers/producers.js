// @flow

import request from 'request'

// import categories from '../data/categories'
// import producers from '../data/producers'

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

export const createProducer = (producer: Object) =>
  new Promise((resolve, reject) => {
    const newProducer = new Producer({
      user_id: producer.user_id,
      title: producer.title,
      description: producer.description,
      categories: producer.categories || [],
      delivery: producer.delivery,
      box_scheme: producer.box_scheme,
      location: {
        type: "Point",
        coordinates: [
          producer.lng,
          producer.lat,
        ]
      },
      social_handles: {
        instagram: producer.instagram_handle,
        twitter: producer.twitter_handle,
      },
      website: producer.website,
    })

    newProducer.save((err, data) => {
      if (err) {
        reject({
          status: 'error',
          data: {
            title: 'There was an error creating the producer',
            errors: err.errors,
          },
        })
      }

      resolve({
        status: 'success',
        data: {
          producer: data,
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
