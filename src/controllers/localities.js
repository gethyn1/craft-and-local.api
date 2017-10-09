// @flow

import Locality from '../models/locality'

export const getLocalities = () =>
  new Promise((resolve, reject) => {
    Locality
      .find({})
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
            localities: results,
          },
        })
      })
  })
