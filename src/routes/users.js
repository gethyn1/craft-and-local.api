// @flow

import { BASE_PATH } from '../config'

import {
  authenticateUser,
  getUsers,
  createUser,
} from '../controllers/users'

import { authenticateJWT } from '../controllers/auth'

export const userRoutes = (app: Object) => {
  app.post(`${BASE_PATH}/user/authenticate`, (req, res) => {
    authenticateUser(req.body.email, req.body.password, req.app.get('jwtTokenSecret'))
      .then(data => res.json(data))
      .catch(err => res.json(err))
  })
  app.get(`${BASE_PATH}/users`, (req, res) => {
    getUsers()
      .then(data => res.json(data))
      .catch(err => res.json(err))
  })
}

export const userAdminRoutes = (app: Object) => {
  app.post(`${BASE_PATH}/users/create`, (req, res) => {
    createUser(req.body)
      .then(data => res.json(data))
      .catch(err => res.json(err))
  })
}
