// @flow

import { BASE_PATH } from '../config'

import {
  createUser,
} from '../controllers/users'

export default (app: Object) => {
  app.post(`${BASE_PATH}/users/create`, (req, res) => {
    createUser(req.body)
      .then(data => res.json(data))
      .catch(err => res.json(err))
  })
}
