module.exports = (err, req, res, next) => {
  let status = 500
  let message = 'Internal Server Error'
  let errors 

  if(err.name === 'ValidationError') {
    status = 400
    message = 'Validation Error'
    errors = []
    for(let key in err.errors) {
      errors.push(err.errors[key].message)
    } 
    console.log(errors)
    console.log(message)
    res.status(status).json({
      msg: message,
      errors
    })
  } else if (err.name === 'MongoError') {
    res.status(err.statusCode).json({
        status: 'fail',
        message: err.message
    })
  } else if (err.name === 'JsonWebTokenError') {
      res.status(401).json({
          message: 'You are not authenticated, please log in'
      })
  } else if (err.name === 'Bad Request') {
      res.status(err.statusCode).json({message: err.message})
  }  else {
      res.status(status).json({
        msg: message
      })
  }
}
