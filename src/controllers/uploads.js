// @flow

import AWS from 'aws-sdk'

import { S3_KEY, S3_SECRET, S3_BUCKET, S3_REGION } from '../config'

AWS.config.region = S3_REGION
AWS.config.accessKeyId = S3_KEY
AWS.config.secretAccessKey = S3_SECRET

const s3 = new AWS.S3({
  params: { Bucket: S3_BUCKET },
})

const timestampedID = () =>
  `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

const getFileExtension = (fileName: string) =>
  fileName.slice((fileName.lastIndexOf('.') - 1 >>> 0) + 2)

const generateUniqueFileName = (fileName: string) =>
  `${timestampedID()}.${getFileExtension(fileName)}`

export const uploadImage = (file: Object) =>

  new Promise((resolve, reject) => {
    const uniqueFileName = generateUniqueFileName(file.originalname)

    const params = {
      Key: uniqueFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentLength : file.size,
      ACL: 'public-read'
    };

    s3.putObject(params, (err, data) => {
        if (err) {
          reject({
            status: 'error',
            data: {
              title: err,
            }
          })
        }

        resolve({
          status: 'success',
          data: {
            url: uniqueFileName,
          },
        })
      }
    )
  })
