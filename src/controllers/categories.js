// @flow

import categories from '../data/categories'

import Category from '../models/category'

export const getCategories = () =>
  new Promise((resolve, reject) => {
    Category
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
            categories: results,
          },
        })
      })
  })
