// @flow

import { BASE_PATH } from '../config'

import {
  getLocalities,
} from '../controllers/localities'

export default (app: Object) => {
  app.get(`${BASE_PATH}/localities`, (req: Object, res: Object) => {
    getLocalities()
      .then(data => res.json(data))
      .catch(err => res.send(err))
  })
}
