// @flow

import { BASE_PATH } from '../config'

import {
  getCategories,
} from '../controllers/categories'

export default (app: Object) => {
  app.get(`${BASE_PATH}/categories`, (req: Object, res: Object) => {
    getCategories()
      .then(data => res.json(data))
      .catch(err => res.send(err))
  })
}
