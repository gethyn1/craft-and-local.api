// @flow

import './dotenv'

/* eslint-disable import/first */

import bodyParser from 'body-parser'
import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import RateLimit from 'express-rate-limit'
import { Server } from 'http'

import './db'
import { WEB_PORT, isProd, JWT_SECRET, CORS_WEB_APP_ORIGIN } from '../config'
import producerRoutes from '../routes/producers'
import categoryRoutes from '../routes/categories'
import { userRoutes, userAdminRoutes } from '../routes/users'

const app = express()
// flow-disable-next-line
const http = Server(app)

app.set('jwtTokenSecret', JWT_SECRET)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Express security with helmet module
app.use(helmet())

// Rate limiting
app.enable('trust proxy')

const limiter = new RateLimit({
  windowMs: 15*60*1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
})

//  apply to all requests
app.use(limiter);

// Setup CORS so front-end app can access the API
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', CORS_WEB_APP_ORIGIN)
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
