// @flow
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config'

import User from '../models/user'

export const authenticateUser = (email: string, password: string, secret: string) =>
  new Promise((resolve, reject) => {
    User.findOne({ email }, (err, user) => {
      if (err) throw err

      if (!user) {
        return reject({
          status: 'error',
          data: {
            title: 'Authentication failed. User not found.',
          },
        })
      }

      user.comparePassword(password)
        .then((isMatch) => {
          if (!isMatch) {
            return reject({
              status: 'error',
              data: {
                title: 'Authentication failed. Incorrect password.',
              },
            })
          }

          const token = jwt.sign(user, secret, {
            expiresIn : 60 * 60 * 24, // expires in 24 hours
          })

          resolve({
            status: 'success',
            data: {
              token,
            },
          })
        })
        .catch((err) => {
          reject({
            status: 'error',
            data: {
              title: 'Authentication failed.',
              errors: err,
            },
          })
        })
    })
  })

export const getUsers = () =>
  new Promise((resolve, reject) => {
    User
      .find()
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
            users: results,
          },
        })
      })

  })

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
