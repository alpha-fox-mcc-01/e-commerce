module.exports = (err, req, res, next) => {
    let status = 500;
    let message = "Internal Server Error"
    let errors = [];
    if (err.name === 'ValidationError') {
        status = 400
        message = 'Validation Error'
        for(let key in err.errors) {
            errors.push(err.errors[key].message)
        }
        res.status(status).json({
            message,
            errors
        })
    } else if(err.name === "Login Error") {
        status = 400
        message = err.message
        res.status(status).json({
            message
        })
    } else if (err.name === "Authorization Error") {
        status = 401
        message = err.message
        res.status(status).json({
            message
        })
    } else {
        console.log(err)
        res.status(status).json({
            message
        })
    } 
}