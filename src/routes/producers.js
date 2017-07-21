// @flow

import { BASE_PATH } from '../config'

import {
  getProducers,
  getProducer,
  getProducerInstagramFeed,
} from '../controllers/producers'

export default (app: Object) => {
  app.get(`${BASE_PATH}/producers`, (req, res) => {
    getProducers(req.query)
      .then(data => res.json(data))
      .catch(err => res.json(err))
  })

  app.get(`${BASE_PATH}/producers/:id`, (req, res) => {
    getProducer(req.params.id)
      .then(data => res.json(data))
      .catch(err => res.json(err))
  })

  app.get(`${BASE_PATH}/instagram/:handle`, (req, res) => {
    getProducerInstagramFeed(req.params.handle)
      .then(data => res.json(data))
      .catch(err => res.json(err))
  })
}
