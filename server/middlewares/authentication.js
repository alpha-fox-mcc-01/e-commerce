const jwt = require ('jsonwebtoken')

module.exports = (req, res, next) => {
   const accessToken = req.headers.token
   if (accessToken) {
      const authenticated = jwt.verify(accessToken, process.env.SECRET)
      if (authenticated) {
         req.currentUserId = authenticated.id
         next()
      }
      else {
         res.status(403).json({ msg : `not allowed to make this request`})
      }
   }
   else {
      res.status(401).json({ msg : `invalid token`})
   } 
}