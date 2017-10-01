// @flow

import request from 'request'

import Producer from '../models/producer'

const PRODUCER_LIMIT = 20

const setProducerFields = (producer: Object) => {
  let updatedFields = {}

  Object.keys(producer).forEach((key) => {
    switch (key) {
      case 'lat':
        if (!updatedFields.location) {
          updatedFields.location = { type: 'Point', coordinates: [0, 0] }
        }
        updatedFields.location.coordinates[1] = producer[key]
        break
      case 'lng':
        if (!updatedFields.location) {
          updatedFields.location = { type: 'Point', coordinates: [0, 0] }
        }
        updatedFields.location.coordinates[0] = producer[key]
        break
      default:
        updatedFields[key] = producer[key]
        break
    }
  })

  return updatedFields
}

export const getProducers = (query: Object) =>
  new Promise((resolve, reject) => {
    let limit = PRODUCER_LIMIT

    // Create an empty filters object for querying the database.
    const filters = {}

    if (query.hasOwnProperty('limit')) {
      // Set a min distance to query from.
      limit = parseInt(query.limit, 10)
    }

    if (query.hasOwnProperty('latlng')) {
      // Filter results by location (nearest to furthest).
      const latLngArr = query.latlng.split(',')
      const lat = latLngArr[0]
      const lng = latLngArr[1]

      filters.location = {
        $near: {
          $geometry: { type: "Point",  coordinates: [ lng, lat ] },
        }
      }

      if (query.hasOwnProperty('mindistance')) {
        // Set a min distance to query from.
        filters.location.$near.$minDistance = query.mindistance
      }

      if (query.hasOwnProperty('exclude')) {
        // Exclude producers by id.
        filters._id = {
          $nin: query.exclude.split(',')
        }
      }
    }

    if (query.hasOwnProperty('categories_like')) {
      // Find producers in category.
      filters.categories = query.categories_like
    }

    Producer
      .find(filters)
      .limit(limit)
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
    const newProducer = new Producer(setProducerFields(producer))

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

        if (!results) {
          reject({
            statusCode: 404,
            data: {
              status: 'error',
              data: {
                title: 'No producer found with requested ID',
              },
            }
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

export const updateProducer = (user_id: string, producer: Object) =>
  new Promise((resolve, reject) => {
    if (!user_id || user_id === 'undefined') {
      return reject({
        status: 'error',
        data: {
          title: 'There was an error updating the producer',
          errors: 'User ID is required',
        },
      })
    }

    if ((producer.lat && !producer.lng) || (producer.lng && !producer.lat)) {
      return reject({
        status: 'error',
        data: {
          title: 'There was an error updating the producer',
          errors: 'Supply both latitude and longitude values',
        },
      })
    }

    Producer
      .findOneAndUpdate(
        { user_id },
        setProducerFields(producer),
        { new: true },
        (err, data) => {
          if (err) {
            reject({
              status: 'error',
              data: {
                title: 'There was an error updating the producer',
              },
            })
          }

          resolve({
            status: 'success',
            data: {
              producer: data,
            },
          })
        }
      )
  })
