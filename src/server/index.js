// @flow

import './dotenv'

/* eslint-disable import/first */

import bodyParser from 'body-parser'
import compression from 'compression'
import express from 'express'
import { Server } from 'http'

import './db'
import { WEB_PORT, isProd, JWT_SECRET } from '../config'
import producerRoutes from '../routes/producers'
import categoryRoutes from '../routes/categories'
import { userRoutes, userAdminRoutes } from '../routes/users'

const app = express()
// flow-disable-next-line
const http = Server(app)

app.set('jwtTokenSecret', JWT_SECRET)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Setup CORS so front-end app can access the API
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  next()
})

producerRoutes(app)
categoryRoutes(app)
userRoutes(app)
userAdminRoutes(app)

http.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${String(WEB_PORT)} ${isProd ? '(production)' :
    '(development)'}.`)
})
