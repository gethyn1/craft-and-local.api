// @flow

const robotsTxtRoute = (app: Object) => {
  app.get('/robots.txt', (req: Object, res: Object) => {
    res.type('text/plain')
    res.send('User-agent: *\nDisallow: /')
  })
}

export default robotsTxtRoute
