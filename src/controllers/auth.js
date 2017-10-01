// @flow

import jwt from 'jsonwebtoken'


/**
 * Default API response for unauthorised request
 */

const unauthorisedResponse = {
  status: 'error',
  data: {
    title: 'Unauthorised request',
  },
}


/**
 * Authentication middleware for testing and decoding JSON web token
 */

export const authenticateJSONWebToken = (req: Object, res: Object, next: Function) => {
  const token = req.get('authorization')
  const secret = req.app.get('jwtTokenSecret')

  if (token && token !== 'undefined') {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.json(unauthorisedResponse)
      } else {

        // Save token for use in other routes
        req.decoded = decoded
        next()
      }
    })

  } else {
    // No JSON web token provided so return error
    res.json(unauthorisedResponse)
  }
}


/**
 * Authentication middleware for role based permissions: admin
 */

export const authenticateAsAdmin = (req: Object, res: Object, next: Function) => {
  if (!req.decoded || !req.decoded._doc.roles.includes('admin')) {
    res.json(unauthorisedResponse)
  } else {
    next()
  }
}
