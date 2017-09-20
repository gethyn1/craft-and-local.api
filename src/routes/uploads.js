// @flow

import multer from 'multer'

import { BASE_PATH } from '../config'

import { authenticateJSONWebToken } from '../controllers/auth'

import { uploadImage } from '../controllers/uploads'

const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 },
})

export default (app: Object) => {
  app.post(
    `${BASE_PATH}/images/upload`,
    // authenticateJSONWebToken,
    upload.single('avatar'),
    (req: Object, res: Object) => {
      uploadImage(req.file)
        .then(data => res.json(data))
        .catch(err => res.json(err))
  })
}
