'use strict'
require('dotenv').config()
const {Storage} = require('@google-cloud/storage')
const CLOUD_BUCKET = process.env.CLOUD_BUCKET
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)
const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}
const sendUploadToGCS = (req, res, next) => {
  // console.log(req.file, `ini log middlewareeeeeeeeeeeee`);
  
  if (!req.file) {
    return next()
  }
  const gcsname = Date.now() + req.file.originalname
  const file = bucket.file(gcsname)
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })
  // console.log(gcsname,`111111111`);

  // console.log(file, `2222222`);
  // console.log(stream, `333333333`);

  
  stream.on('error', (err) => {
    console.log(err);
    
    req.file.cloudStorageError = err
    next(err)
  })
  stream.on('finish', () => {
    console.log(`finishhh`);
    
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      // console.log(req.file,` ini log 222222222222222222`);
      next()
    })
  })
  stream.end(req.file.buffer)
}
const Multer = require('multer'),
      multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        }
        // dest: '../images'
      })
module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
}