// @flow

import { BASE_PATH } from '../config'

import {
  createProducer,
  getProducers,
  getProducer,
  getProducerInstagramFeed,
} from '../controllers/producers'

import {
  authenticateJSONWebToken,
  authenticateAsAdmin,
} from '../controllers/auth'

export default (app: Object) => {
  app.get(`${BASE_PATH}/producers`, (req: Object, res: Object) => {
    getProducers(req.query)
      .then(data => res.json(data))
      .catch(err => res.json(err))
  })

  app.post(
    `${BASE_PATH}/producers/create`,
    authenticateJSONWebToken,
    authenticateAsAdmin,
    (req: Object, res: Object) => {
    createProducer(req.body)
      .then(data => res.json(data))
      .catch(err => res.json(err))
  })

  app.get(`${BASE_PATH}/producers/:id`, (req: Object, res: Object) => {
    getProducer(req.params.id)
      .then(data => res.json(data))
      .catch(err => res.status(err.statusCode).json(err.data))
  })

  app.get(`${BASE_PATH}/instagram/:handle`, (req: Object, res: Object) => {
    getProducerInstagramFeed(req.params.handle)
      .then(data => res.json(data))
      .catch(err => res.json(err))
  })
}
