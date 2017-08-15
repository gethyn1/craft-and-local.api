// @flow

import User from '../models/user'

export const createUser = (user: Object) =>
  new Promise((resolve, reject) => {
    const newUser = new User(user)

    newUser.save((err, data) => {
      if (err) {
        reject({
          status: 'error',
          data: {
            title: 'There was an error creating the user',
            errors: err.errors,
          },
        })
      }

      resolve({
        status: 'success',
        data: {
          user: data,
        },
      })
    })
  })
