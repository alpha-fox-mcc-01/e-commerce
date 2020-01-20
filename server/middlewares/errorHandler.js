
module.exports = (err, req, res, next) => {
  let status = 500;
  let message = 'Internal Server Error';
  let errors = [];
  console.log(err.name)

  if(err.name === 'ValidationError') {
    status = 400
    message = 'Validation Error'
    for(let key in err.errors) {
      errors.push(err.errors[key].message);
    }
    res.status(status).json({
      msg: message,
      errors
    })
  } else if(err.name === 'MongoError') {
    status = 400;
    message = 'Email is already used';
    res.status(status).json({
      msg: message
    })
  } else if(err.name === 'Bad Request') {
    status = err.status;
    message = err.message;
    res.status(status).json({
      msg: message
    })
  } else if(err.name === 'Unauthorized') {
    status = err.status;
    message = err.message;
    res.status(status).json({
      msg: message
    })
  } else {
    res.status(status).json({
      msg: message
    })
  }
}