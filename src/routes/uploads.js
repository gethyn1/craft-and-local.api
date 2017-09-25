// @flow

import multer from 'multer'

import { BASE_PATH } from '../config'

import {
  authenticateJSONWebToken,
  authenticateAsAdmin,
} from '../controllers/auth'

import { uploadImage, deleteImage } from '../controllers/uploads'

const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 },
})

export default (app: Object) => {
  app.post(
    `${BASE_PATH}/uploads/avatar`,
    authenticateJSONWebToken,
    authenticateAsAdmin,
    upload.single('avatar'),
    (req: Object, res: Object) => {
      uploadImage(req.file)
        .then(data => res.json(data))
        .catch(err => res.json(err))
  })

  app.post(
    `${BASE_PATH}/uploads/delete`,
    authenticateJSONWebToken,
    authenticateAsAdmin,
    (req: Object, res: Object) => {
      deleteImage(req.body.key)
        .then(data => res.json(data))
        .catch(err => res.json(err))
  })
}
