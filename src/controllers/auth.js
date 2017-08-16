// @flow

import jwt from 'jsonwebtoken'

const unauthorisedResponse = {
  status: 'error',
  data: {
    title: 'Unauthorised request',
  },
}

/**
 * Authentication middleware for testing and decoding JSON web token
 */

export const authenticateJWT = (req: Object, res: Object, next: Function) => {
  const token = req.get('authorization')
  const secret = req.app.get('jwtTokenSecret')

  if (token && token !== 'undefined') {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log('error with token')
        res.json(unauthorisedResponse)
      }

      // Save token for use in other routes
      req.decoded = decoded
      next()
    })

  } else {
    // No JSON web token provided so return error
    res.json(unauthorisedResponse)
  }
}
