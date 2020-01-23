module.exports = (err, req, res, next) => {
  let status = 500
  let message = 'Internal Server Error'
  let errors

  // console.log(err, `INI LOG ERR DI ERRORHANDLERRRRRRRRRRRRRRRRRRRRR`)
  // console.log("------------")

  if (err.name === 'ValidationError') {
    status = 400
    message = 'Validation Error'
    error = err.message
    // console.log(err, `================ini errror di erorhenler`);
    
    // console.log(err)
    // console.log(message)
    res.status(status).json({
      msg: message, error
    })
  }
  else if (err.name === `MongoError`) {
    status = 400
    message = `Email already used`
    res.status(status).json({msg : message})
  }

  else {    
    res.status(status).json({
      msg: message
    })
  }

}