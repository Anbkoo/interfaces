const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401)
    }
    try{
        const decodedToken = jwt.verify(token,'SECRET_BLOG_KEY')
        req.user = decodedToken
    } catch(err){
        return res.status(401)
    }

    return next();
}