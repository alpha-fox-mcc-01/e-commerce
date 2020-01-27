module.exports = (req, res, next) => {
    if (req.admin) next()
    else next({
        msg: 'Not Authorized',
        desc: 'product'
    })
}
