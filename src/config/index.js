// @flow

export const WEB_PORT = process.env.PORT

export const JWT_SECRET = process.env.SECRET
export const JWT_SESSION = { session: false }

export const CORS_WEB_APP_ORIGIN = process.env.CORS_WEB_APP_ORIGIN

export const APP_NAME = 'Craft & Local API'

export const BASE_PATH = ''

export const isProd = process.env.NODE_ENV === 'production'
export const DEBUG =  false
