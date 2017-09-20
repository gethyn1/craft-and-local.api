// @flow

export const WEB_PORT = process.env.PORT

export const JWT_SECRET = process.env.SECRET
export const JWT_SESSION = { session: false }

export const CORS_WEB_APP_ORIGIN = process.env.CORS_WEB_APP_ORIGIN

export const APP_NAME = 'Craft & Local API'

export const BASE_PATH = ''

export const isProd = process.env.NODE_ENV === 'production'
export const DEBUG =  false

export const S3_KEY = process.env.S3_KEY
export const S3_SECRET = process.env.S3_SECRET
export const S3_BUCKET = process.env.S3_BUCKET
export const S3_REGION = process.env.S3_REGION
