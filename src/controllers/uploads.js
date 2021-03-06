// @flow

import AWS from 'aws-sdk'

import { S3_KEY, S3_SECRET, S3_BUCKET, S3_REGION } from '../config'
import Producer from '../models/producer'

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
    }

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

export const deleteImage = (key: string) =>
  new Promise((resolve, reject) => {
    const params = {
      Key: key,
    }

    s3.deleteObject(params, (err, data) => {
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
          title: 'File succesfully deleted',
        },
      })
    })
  })

export const updateImageField = (file: Object, userId: string) =>
  new Promise((resolve, reject) => {
    // Upload the image
    uploadImage(file)
      .then((data) => {
        // Find producer by userId
        Producer.findOne({ user_id: userId }, (err, producer) => {
          if(err) {
            reject({
              status: 'error',
              data: {
                title: err,
              }
            })
          }

          // If field already has a value then delete current image
          const currentFile = producer[file.fieldname]

          if (currentFile) {
            deleteImage(currentFile)
          }

          // Update doc with new image path
          producer[file.fieldname] = data.data.url

          producer.save((err) => {
            if (err) {
              reject({
                status: 'error',
                data: {
                  title: err,
                }
              })
            }

            // Return data
            resolve({
              status: 'success',
              data: {
                url: data.data.url,
              },
            })
          })
        })
      })
      .catch(err => reject(err))
  })
