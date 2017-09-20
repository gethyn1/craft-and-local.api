// @flow

import AWS from 'aws-sdk'

import { S3_KEY, S3_SECRET, S3_BUCKET, S3_REGION } from '../config'

AWS.config.region = S3_REGION
AWS.config.accessKeyId = S3_KEY
AWS.config.secretAccessKey = S3_SECRET

const s3 = new AWS.S3({
  params: { Bucket: S3_BUCKET },
})

export const uploadImage = (file: Object) =>
  new Promise((resolve, reject) => {
    const params = {
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentLength : file.size,
      ACL: 'public-read'
    };

    s3.putObject(params, (err, data) => {
        if (err) {
          console.log('err', err)
          reject({
            status: 'error',
            data: {
              title: err,
            }
          })
        }

        console.log('data', data)
        resolve({
          status: 'success',
          data: {
            url: file.originalname,
          },
        })
      }
    )
  })
