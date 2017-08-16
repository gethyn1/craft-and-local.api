// @flow

import { BASE_PATH } from '../config'

import {
  authenticateUser,
  getUsers,
  createUser,
} from '../controllers/users'

import { authenticateJWT } from '../controllers/auth'

export const userRoutes = (app: Object) => {
  app.post(`${BASE_PATH}/user/authenticate`, (req: Object, res: Object) => {
    authenticateUser(req.body.email, req.body.password, req.app.get('jwtTokenSecret'))
      .then(data => res.json(data))
      .catch(err => res.json(err))
  })
  app.get(`${BASE_PATH}/users`, (req: Object, res: Object) => {
    getUsers()
      .then(data => res.json(data))
      .catch(err => res.json(err))
  })
}

export const userAdminRoutes = (app: Object) => {
  app.post(`${BASE_PATH}/users/create`, (req: Object, res: Object) => {
    createUser(req.body)
      .then(data => res.json(data))
      .catch(err => res.json(err))
  })
}
