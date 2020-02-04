
module.exports = (err, req, res, next) => {
    let status = 500
    let message = 'Internal Server Error'
    let errors

    // console.log(err, 'asadasdasdasdasdasdsadasdsada');
    

    if (err.name === 'ValidationError') {
        // errors = err.message
        status = 400
        message = 'Validation Error'
          errors = []
          for(let key in err.errors) {
            errors.push(err.errors[key].message)
          }
        console.log(errors, '======masuk validation error======')
        console.log(message, '+++++++++++++')
        res.status(status).json({
            msg: message,
            errors
        })
    } else if(err.name === 'MongoError') {
        status = 400
        message = 'email has taken'
        console.log(errors, '============')
        console.log(message, '+++++++++++++')
        res.status(status).json({
            msg: message,
            errors
        })
    }else if(err.name === 'email/password wrong') {
        status = 404
        message = 'email/password wrong'
        console.log(errors, '============')
        console.log(message, '+++++++++++++')
        res.status(status).json({
            msg: message,
            errors
        })
    }else if(err.name === 'CastError') {
        status = 404
        message = 'item not found'
        console.log(errors, '============')
        console.log(message, '+++++++++++++')
        res.status(status).json({
            msg: message,
            errors
        })
    }else {
        res.status(status).json({
            msg: message
        })
    }

}