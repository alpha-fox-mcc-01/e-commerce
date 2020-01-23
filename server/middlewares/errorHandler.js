module.exports = (err, req, res, next) => {
  let status = 500
  let message = 'Internal Server Error'
  let errors 
  console.log(err, 'ini di error handler')

  if(err.name === 'ValidationError') {
    status = 400
    message = 'Validation Error'
    errors = []
    for(let key in err.errors) {
      errors.push(err.errors[key].message)
    }
    res.status(status).json({
      msg: message,
      errors
    })
  } else if (err.msg === 'Input Wrong') {
      res.status(400).json({
        msg : err.msg,
        error: err.error
      })
  } else if (err.name === 'CastError') {
      if (err.kind ==='ObjectId') {
        res.status(400).json({
          msg: 'Id is invalid'
        })
      } else {
        res.status(status).json({
          msg: 'CastError',
          err
        })
      }
  } else {
    res.status(status).json({
      msg: message
    })
  }
  
}

// { stringValue: '"1"',
//   kind: 'ObjectId',
//   value: '1',
//   path: '_id',
//   reason: {},
//   message:
//    'Cast to ObjectId failed for value "1" at path "_id" for model "Product"',
//   name: 'CastError' }