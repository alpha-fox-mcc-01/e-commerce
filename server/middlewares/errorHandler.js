module.exports = (err, req, res, next) => {
  let status = 500
  let message = 'Internal Server Error'
  let errors 

  // console.log(err, 'ini di error handler');
  

  if(err.name === 'ValidationError') {
    status = 400
    message = 'Validation Error'
    errors = []
    for(let key in err.errors) {
      errors.push(err.errors[key].message)
    }
    // console.log(errors)
    // console.log(message)
    res.status(status).json({
      msg: message,
      errors
    })
  } else if (err.msg === 'Input Wrong') {
      res.status(400).json({
        msg : err.msg,
        error: err.error
      })
  } else {
    res.status(status).json({
      msg: message
    })
  }
  
}